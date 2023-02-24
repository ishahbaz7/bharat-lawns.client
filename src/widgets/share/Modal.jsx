export default function Modal({ children, open, onClose, className }) {
  return (
    <div className={`${open ? "block" : "hidden"} transition-all ${className}`}>
      <div
        onClick={() => onClose()}
        className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none transition-all focus:outline-none`}
      >
        <div className="container relative my-6 mx-auto w-auto">
          {/*content*/}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none"
          >
            {children}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </div>
  );
}
