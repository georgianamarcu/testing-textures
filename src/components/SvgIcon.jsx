const SvgIcon = ({ size, setSmallSofa, toggle }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="#D9D9D9"
      viewBox="0 0 256 256"
      className="svg-icon"
      onClick={() => setSmallSofa(toggle)}
    >
      <path d="M236,108.7V72a12,12,0,0,0-12-12H32A12,12,0,0,0,20,72v36.7A12,12,0,0,0,12,120v48a12,12,0,0,0,12,12H36v20a4,4,0,0,0,8,0V180H212v20a4,4,0,0,0,8,0V180h12a12,12,0,0,0,12-12V120A12,12,0,0,0,236,108.7ZM228,72v36H216a12,12,0,0,0-12,12v16a4,4,0,0,1-4,4H132V68h92A4,4,0,0,1,228,72ZM32,68h92v72H56a4,4,0,0,1-4-4V120a12,12,0,0,0-12-12H28V72A4,4,0,0,1,32,68ZM236,168a4,4,0,0,1-4,4H24a4,4,0,0,1-4-4V120a4,4,0,0,1,4-4H40a4,4,0,0,1,4,4v16a12,12,0,0,0,12,12H200a12,12,0,0,0,12-12V120a4,4,0,0,1,4-4h16a4,4,0,0,1,4,4Z"></path>
    </svg>
  );
};

export default SvgIcon;
