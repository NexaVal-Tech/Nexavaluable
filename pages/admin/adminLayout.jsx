import SideBar from "./sideBar";

export default function adminLayout({ children }) {
  return (
    <div className="sm:fixed w-full">
      <header className="w-[100%] p-2 flex items-center justify-center fixed z-10 "></header>

      <main className="h-[100vh] flex  ">
        <div className="">
          <SideBar />
        </div>
        <div className="!pl-5 p-3 w-full">{children}</div>
      </main>

      <footer>{/* Footer content */}</footer>
    </div>
  );
}
