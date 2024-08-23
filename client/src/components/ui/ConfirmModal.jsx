import { RxCross2 } from "react-icons/rx";
import { UseModalsContext } from "../../Context/ModalsContext";
import { useEffect, useRef } from "react";
function ConfirmModal({ type, onDelete, onUpdate }) {
  const { setIsConfirmModalOpen } = UseModalsContext();
  const modalDiv = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalDiv.current && !modalDiv.current.contains(event.target)) {
        setIsConfirmModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsConfirmModalOpen]);
  return (
    <div className="fixed center bg-mainGreen/20  z-50  inset-0">
      <div
        ref={modalDiv}
        className="bg-white relative top-[50%] flex  items-center shadow-lg  overflow-auto rounded-lg md:max-w-[500px] max-w-[400px] h-fit translate-y-[-50%] left-[50%] translate-x-[-50%] "
      >
        <RxCross2
          onClick={() => setIsConfirmModalOpen(false)}
          className="absolute top-6 right-6 text-3xl cursor-pointer text-black/50 hover:text-black"
        />
        <div className="p-4  my-16 font-textFont text-mainGreen w-fit m-auto">
          <h2 className="text-xl mb-8 text-center md:text-start">
            {type === "delete"
              ? "Are you sure you want to proceed with deleting ?"
              : "Do you want to proceed with updating process ?"}
          </h2>
          <div className="flex gap-4 md:justify-end justify-center">
            <button
              onClick={() => setIsConfirmModalOpen(false)}
              className="border-[0.5px] transition-all duration-300 ease-in-out cursor-pointer hover:tracking-wider hover:bg-amber-100 border-mainGreen p-2 px-4 rounded-full uppercase font-textFont tracking-widest"
            >
              Cancel
            </button>
            {type === "delete" ? (
              <button
                onClick={onDelete}
                className="border-[0.5px] transition-all duration-300 ease-in-out cursor-pointer hover:tracking-wider bg-red-300 hover:bg-red-600 text-white border-red-900 p-2 px-4 rounded-full uppercase font-textFont tracking-widest"
              >
                Delete
              </button>
            ) : (
              <button
                onClick={onUpdate}
                className="border-[0.5px] transition-all duration-300 ease-in-out cursor-pointer hover:tracking-wider bg-mainGreen/30 hover:bg-mainGreen/80 text-white border-mainGreen p-2 px-4 rounded-full uppercase font-textFont tracking-widest"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
