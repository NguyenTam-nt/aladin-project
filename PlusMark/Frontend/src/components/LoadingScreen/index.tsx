export default function LoadingScreen({
  size = 5,
  width = 50
}: {
  size?: number
  width?: number
}) {
  return (
    <div
      className="fixed top-0 bottom-0 right-0 left-0 m-auto flex flex-col gap-1 justify-center items-center z-[9999]"
      style={{
        backgroundColor: "rgba(0, 0 , 0, 0.7)"
      }}
    >
      <div
        className='loading'
        style={{
          border: `${size}px solid #fff`,
          width: width,
          borderRightColor: 'var(--main-color)'
        }}
      />
    </div>
  )
}