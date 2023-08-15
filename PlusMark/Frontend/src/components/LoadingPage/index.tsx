export default function LoadingPage({
  size = 5,
  width = 50
}: {
  size?: number
  width?: number
}) {
  return (
    <div
      className='loading'
      style={{
        border: `${size}px solid #fff`,
        width: width,
        borderRightColor: 'var(--main-color)'
      }}
    />
  )
}