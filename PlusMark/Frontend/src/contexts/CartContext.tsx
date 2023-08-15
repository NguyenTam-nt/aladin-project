
import { useLocalStorage } from "@hooks/useLocalStorage"
import AuthService from "@services/AuthServices"
import CartServices, { CartItemRequest } from "@services/CartServices"
import ProductServices from "@services/ProductServices"
import { ProductColor, ProductItem, ProductSize } from "@services/ProductServices"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type CartProviderProps = {
  children: ReactNode
}

export type CartItem = {
  id: string,
  name: string,
  image: string,
  price: number,
  size: ProductSize,
  color: ProductColor,
  quantity: number,
  choose?: boolean,
  sku: string
}

type CartContext = {
  getItemQuantity: (id: string) => number
  chooseProduct: (id: string, sizeName: string, colorName: string, status: boolean) => void
  onChangeItem: (id: string, itemNew: CartItem, oldItem?: CartItem) => void
  cartQuantity: number
  totalPrice: number
  totalPriceChoose: number
  cartItems: CartItem[]
}

const CartContext = createContext({} as CartContext)

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItemsLocalStorage, setCartItemsLocalStorage] = useLocalStorage<CartItem[]> (
    "supershop-cart",
    []
  )

  const [cartItems, setCartItems] = useState<CartItem[]> ([])
  const [isCheckData, setisCheckData] = useState(false)

  useEffect(() => {
    if(AuthService.isLoggedIn()) {
      handleGetCartFromServer()
    } else {
      setCartItems(cartItemsLocalStorage)
      setisCheckData(true)
    }
  }, [])

  useEffect(() => {
    if(isCheckData) {
      handleCheckProductCartValid()
    } 
  }, [isCheckData])

  useEffect(() => {
    if(!AuthService.isLoggedIn()) {
      setCartItemsLocalStorage(cartItems)
    }
  }, [cartItems])

  // console.log(cartItems);
  

  const handleGetCartFromServer = () => {
    CartServices.getAllCartItems()
      .then(data => {
        // console.log(data);
        setisCheckData(true)
        setCartItems(data ? data.map(d => {
          return {
            id: d.itemId,
            name: d.itemName,
            image: d.image,
            price: d.price,
            size: {
              sizeName: d.size,
              sale: -1,
              priceSale: 0,
              total: 0
            },
            color: {
              colorName: d.color,
              colorCode: "",
              image: "",
              sizes: []
            },
            quantity: d.total,
            sku: d.sku
          }
        }) : [])
      })
  }

  const handleSaveCartToServer = (cartItems: CartItemRequest[]) => {
    CartServices.changeCartItems(cartItems)
  }

  const handleCheckProductCartValid = () => {
    for(let i = 0; i < cartItems.length; i++ ) {
      if(cartItems[i] && cartItems[i].id) {
        try {
        
          ProductServices.getProductDetail(cartItems[i].id)
            .then(data => {
              // console.log(data);
              if(data) {
  
                let colorSelected = data.colors.filter(c => c.colorName == cartItems[i].color.colorName)[0]
                let sizeSelected = colorSelected && colorSelected.sizes.filter(s => s.sizeName == cartItems[i].size.sizeName)[0]
    
                if(colorSelected && sizeSelected) {
                  cartItems[i].price = sizeSelected.priceSale
                  cartItems[i].size = sizeSelected
                  cartItems[i].color = colorSelected
                  if(sizeSelected.total < cartItems[i].quantity) {
                    cartItems[i].quantity = sizeSelected.total
                  }
                  setCartItems([...cartItems])
                }
              } else {
                setCartItems([...cartItems.filter(c => c != null && c.id != cartItems[i].id)])
              }
              
            }).catch(e => {
              setCartItems([...cartItems.filter(c => c != null && c.id != cartItems[i].id)])
            })
        } catch (error) {
          setCartItems([...cartItems.filter(c => c != null && c.id != cartItems[i].id)])
        }
      }
    }
  }

  const totalPrice = cartItems.reduce(
    (price, item) => (item ? item.quantity * item.price : 0) + price,
    0
  )

  const totalPriceChoose = cartItems.reduce(
    (price, item) => (item.choose ? item.quantity * item.price : 0) + price,
    0
  )

  const cartQuantity = cartItems.length

  function getItemQuantity(id: string) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function onChangeItem(id: string, itemNew: CartItem, oldItem?: CartItem) {
    if(AuthService.isLoggedIn()) {
      let newItemRequest = {
        itemId: id,
        itemName: itemNew.name,
        image: itemNew.image,
        size: itemNew.size.sizeName,
        color: itemNew.color.colorName,
        price: itemNew.price,
        total: itemNew.quantity,
        sku: itemNew.sku
      }
      if(oldItem) {
        let oldItemRequest = {
          itemId: id,
          itemName: oldItem.name,
          image: oldItem.image,
          size: oldItem.size.sizeName,
          color: oldItem.color.colorName,
          price: oldItem.price,
          total: oldItem.quantity,
          sku: oldItem.sku
        }
        handleSaveCartToServer([newItemRequest, oldItemRequest])
      } else {
        handleSaveCartToServer([newItemRequest])
      }
    }
    setCartItems(currItems => {
      if(itemNew.quantity <= 0) {
        return currItems.filter(item => item.id != id || 
          item.size.sizeName != itemNew.size.sizeName || 
          item.color.colorName != itemNew.color.colorName)
      }else if (currItems.find(item => item.id == id && 
        item.size.sizeName == itemNew.size.sizeName && 
        item.color.colorName == itemNew.color.colorName) == null) {
        return [...currItems, { ...itemNew }]
      } else {
        return [...currItems.map(item => {
          if (item.id === id && 
            item.size.sizeName == itemNew.size.sizeName && 
            item.color.colorName == itemNew.color.colorName) {
            return { ...itemNew}
          } else {
            return item
          }
        })]
      }
    })
  }

  function chooseProduct(id: string, sizeName: string, colorName: string, status: boolean) {
    setCartItems(currItems => {
      
        return currItems.map(item => {
          if (item.id === id && item.size.sizeName == sizeName &&
            item.color.colorName == colorName) {
            return { ...item, choose: status }
          } else {
            return item
          }
        })
    })
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        chooseProduct,
        onChangeItem,
        cartItems,
        totalPrice,
        totalPriceChoose,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}