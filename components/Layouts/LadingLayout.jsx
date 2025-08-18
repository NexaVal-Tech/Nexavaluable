import Nav from '../navs/Nav'
export default function Layout({ children }) {
  return (
    <div className=" py-2 bg">
      <header className="w-[100%] p-2 flex items-center justify-center fixed z-10 ">
        <Nav />
      </header>

      <main className=" mt-5">{children}</main>

      <footer>{/* Footer content */}</footer>
    </div>
  );
}