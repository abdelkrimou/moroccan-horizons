function PrimaryBtn({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={type === "submit" ? undefined : onClick}
      className="border-[1px] hover:bg-mainYellow/60  capitalize bg-accentYellow font-mainFont rounded-full py-4 hover:tracking-wide hover:space-x-3 transition-all duration-200 ease-in-out px-6 border-accentGreen text-mainGreen"
    >
      {children}
    </button>
  );
}

export default PrimaryBtn;
