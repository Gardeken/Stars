const YesorNo = ({ checked, input, text1, text2 }) => {
  return (
    <label className="container-yn" htmlFor={input}>
      <div className={checked ? "blockBrown left" : "blockBrown"}></div>
      <span className={checked ? "colorWhite" : ""}>{text1}</span>
      <div className="separador"></div>
      <span className={!checked ? "colorWhite" : ""}>{text2}</span>
    </label>
  );
};

export default YesorNo;
