import {
  CloseButtonIconGray,
  DeleteIcon,
  PenIcon,
  SubtractionIcon,
} from "@assets/icons";
import { RootCategory } from "commons/contannt";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryChildrenView = (props: {
  item: RootCategory;
  handleDeteleC: (item: RootCategory) => void;
}) => {
  const navigate = useNavigate();
  const { item, handleDeteleC } = props;
  const [isShowChildren, setShowChildren] = useState<boolean>(false);
  return (
    <div className="pl-5">
      <div className="flex items-center gap-2 w-full">
        <div className="w-4">
          {item.hasChild &&
            item.children.length > 0 &&
            (isShowChildren ? (
              <SubtractionIcon
                width={12}
                height={12}
                fill={"#8E8E8E"}
                onClick={() => setShowChildren(false)}
              />
            ) : (
              <CloseButtonIconGray
                width={12}
                height={12}
                onClick={() => setShowChildren(true)}
              />
            ))}
        </div>
        <div className="flex items-center justify-between showPencil w-full">
          <p className="text-lg leading-18 line-clamp-1 py-2 px-3">
            {item.categoryName}
          </p>
          <div className="flex items-center gap-1">
            <PenIcon
              width={15}
              height={20}
              onClick={() => navigate(`edit/${item.categorySId}`)}
            />
            <DeleteIcon
              width={10}
              height={20}
              onClick={() => {
                handleDeteleC(item);
              }}
            />
          </div>
        </div>
      </div>
      <div
        className={
          " w-full overflow-hidden rounded-md z-30 ease-in duration-300 " +
          (isShowChildren ? "h-auto" : "h-0")
        }
      >
        <div className="pl-5 ">
          {item.children.length > 0 &&
            item.children.map((itemChView, indexChView) => {
              return (
                <div
                  key={indexChView}
                  className="flex items-center justify-between showPencil w-full"
                >
                  <p className="text-lg leading-18 line-clamp-1 py-2 pr-3 pl-8">
                    {itemChView.categoryName}
                  </p>
                  <div className="flex items-center gap-1">
                    <PenIcon
                      width={15}
                      height={20}
                      onClick={() => navigate(`edit/${item.categorySId}`)}
                    />
                    <DeleteIcon
                      width={10}
                      height={20}
                      onClick={() => handleDeteleC(itemChView)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const CategoryItemView = (props: {
  item: RootCategory;
  handleDeteleC: (item: RootCategory) => void;
}) => {
  const navigate = useNavigate();
  const { item, handleDeteleC } = props;
  const [isShowChildren, setShowChildren] = useState<boolean>(false);

  return (
    <div className="text-lg py-2 rounded-t-sm px-5 hover:bg-gray-100 w-full flex flex-col items-center justify-between cursor-pointer">
      <div className="flex items-center gap-2 w-full">
        <div className="w-4">
          {item.hasChild &&
            item.children.length > 0 &&
            (isShowChildren ? (
              <SubtractionIcon
                width={12}
                height={12}
                fill={"#8E8E8E"}
                onClick={() => setShowChildren(false)}
              />
            ) : (
              <CloseButtonIconGray
                width={12}
                height={12}
                onClick={() => setShowChildren(true)}
              />
            ))}
        </div>
        <div className="flex items-center justify-between showPencil w-full">
          <p className="text-lg leading-18 line-clamp-1 py-2 px-3">
            {item.categoryName}
          </p>
          <div className="flex items-center gap-1">
            <PenIcon
              width={15}
              height={20}
              onClick={() => navigate(`edit/${item.categorySId}`)}
            />
            <DeleteIcon
              width={10}
              height={20}
              onClick={() => handleDeteleC(item)}
            />
          </div>
        </div>
      </div>
      <div
        className={
          " w-full overflow-hidden rounded-md z-30 ease-in duration-300 " +
          (isShowChildren ? "h-auto" : "h-0")
        }
      >
        {item.hasChild &&
          item.children.length > 0 &&
          item.children.map((itemCh, indexCh) => {
            return (
              <CategoryChildrenView
                handleDeteleC={handleDeteleC}
                item={itemCh}
                key={indexCh}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CategoryItemView;
