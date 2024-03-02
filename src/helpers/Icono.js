export const Icono = ({ styles, name, imgUrl, activo, disabled, handleClick }) => (
    <div className={`w-[48px] h-[48px] rounded-[10px] ${activo && activo === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
      {!activo ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${activo !== name && 'grayscale'}`} />
      )}
    </div>
  );