function SecondaryBtn({ children, disabled, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled || false}
      onClick={onClick || undefined}
      className="border-[1px] hover:bg-amber-50 py-4 font-mainFont rounded-full hover:tracking-widest hover:space-x-3 transition-all duration-200 ease-in-out px-6 border-accentGreen text-mainGreen"
    >
      {children}
    </button>
  );
}

export default SecondaryBtn;
