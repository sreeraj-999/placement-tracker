import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />

      <div
        className="flex-grow-1 p-4"
        style={{
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;