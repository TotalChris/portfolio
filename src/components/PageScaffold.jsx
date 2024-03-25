export default function PageScaffold({ children, extras }) {
  return (
    <div className={ `mx-4 lg:mx-auto py-24 lg:px-8 min-h-full max-w-screen col:max-w-screen-col ${extras}` }>
        {children}    
    </div>
  )
}
