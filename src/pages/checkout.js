import React, { useEffect, useState } from "react";
import Link from "next/link";
const checkout = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    let d = localStorage.getItem("carditams");
    setdata(JSON?.parse(d));
  }, []);
  let priceArray = [0];
  let cancelPriceArray = [0];

  data?.map((food) => {
    priceArray.push(Number(food.VariantPrice * food.Qty));
  });
  data?.map((food) => {
    cancelPriceArray.push(Number(food.VariantCompareAtPrice * food.Qty));
  });

  let cartTotalPrice = priceArray?.reduce((a, b) => a + b);
  let cancelcartTotalPrice = cancelPriceArray?.reduce((a, b) => a + b);
  const initialTime = 300; // 10 minutes in seconds
  const [time, setTime] = useState(initialTime);
  let upiid = "merchant1071379.augp@aubank";
  const [payment, setPayment] = useState(
    `tez://upi/pay?pa=${upiid}&pn=Online%20Shopping&am=${Number(
      cartTotalPrice
    )}&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=Online%20Shopping`
  );
  const [activeTab, setActiveTab] = useState(2);
  useEffect(() => {
    switch (activeTab) {
      case 4:
        setPayment(
          `paytmmp://pay?pa=${upiid}&pn=Book My Event&am=${Number(
            cartTotalPrice
          )}&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=Online%20Shopping`
        );
        break;
      case 1:
        setPayment(
          `bhim://pay?pa=${upiid}&pn=Online%20Shopping&am=${Number(
            cartTotalPrice
          )}&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=Online%20Shopping`
        );
        break;
      case 2:
        setPayment(
          `tez://upi/pay?pa=${upiid}&pn=Online%20Shopping&am=${Number(
            cartTotalPrice
          )}&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=Online%20Shopping`
        );
        break;
      case 3:
        setPayment(
          `phonepe://pay?pa=${upiid}&pn=Book My Event&am=${Number(
            cartTotalPrice
          )}&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=Online%20Shopping`
        );
        break;
      case 5:
        setPayment(
          `whatsapp://pay?phone=${upiid}&text=Pay%20for%20Online%20Shopping&amount=${Number(
            cancelcartTotalPrice
          )}&currency=INR`
        );
        break;

      default:
        break;
    }
  }, [activeTab, cancelcartTotalPrice]);
  const handleOpenUpi = () => {};
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div>
      <div className="card py-1 my-1">
        <div className="card px-3 py-4 mb-2" id="price-detail">
          <h3>Price Details</h3>
          <div className="price-detail-div mt-2">
            <div className="product-price-list my-3">
              <span className="title">{`Price (${data?.length} item)`}</span>
              <span className="data selling_price me-0 td-none">
                ₹ {Number(cartTotalPrice) || 0}
              </span>
            </div>
            <div className="product-price-list my-3">
              <span className="title">Discount</span>
              <span className="data discount-amt text-success">
                ₹ {Number(cartTotalPrice - cancelcartTotalPrice) || 0}
              </span>
            </div>
            <div className="product-price-list my-3">
              <span className="title">Delivery Charges</span>
              <span className="data text-success">FREE </span>
            </div>
            <div className="product-price-list mt-3 pt-3 total">
              <span className="title">Amount Payable</span>
              <span className="data selling_price">
                ₹ {Number(cartTotalPrice) || 0}
              </span>
            </div>
          </div>
        </div>
        <div className="py-2 px-3 dddd">
          <div
            id="divgpay"
            className={`form-check available-method ${
              activeTab === 2 && "active"
            }`}
            pay-type="gpay"
            onClick={() => handleTabClick(2)}
          >
            <label
              className="form-check-label"
              style={{
                width: "75%",
                display: "flex",
                alignContent: "center",
              }}
            >
              <img
                src="https://play-lh.googleusercontent.com/0dn-CnZkqyLm5PpjdHBrYR9hvnGDNgoLTe8yfrSaPWUx7ZBVGI4C_18-jL06oNCRRCK3=w240-h480-rw"
                className="pay-logo "
                alt="button"
                width={58}
                height={58}
              />
              <span className="unaviablee  px-4">Google Pay</span>
            </label>
          </div>
          <div
            id="divphonepe"
            className={`form-check available-method ${
              activeTab === 3 && "active"
            }`}
            pay-type="phonepe"
            onClick={() => handleTabClick(3)}
          >
            <label
              className="form-check-label"
              style={{
                width: "75%",
                display: "flex",
                alignContent: "center",
              }}
            >
              <img
                src="https://scontent.famd1-2.fna.fbcdn.net/v/t1.6435-9/43447413_1987166791348029_9209894455249731584_n.png?_nc_cat=105&ccb=1-7&_nc_sid=7a1959&_nc_ohc=pVsV_ZA6w8MAX-T1A9K&_nc_ht=scontent.famd1-2.fna&oh=00_AfBzH7jP4xPd7bJwz4ExLjev4f3ry61y48zoTKyh92yXOw&oe=6565B504"
                className="pay-logo "
                alt="button"
                width={58}
                height={58}
              />
              <span className="unaviablee px-4">PhonePe</span>
            </label>
          </div>
          <div
            id="divpaytm"
            className={`form-check available-method ${
              activeTab === 4 && "active"
            }`}
            pay-type="paytm"
            onClick={() => handleTabClick(4)}
          >
            <label
              className="form-check-label"
              style={{
                width: "75%",
                display: "flex",
                alignContent: "center",
              }}
            >
              <img
                src="https://www.logo.wine/a/logo/Paytm/Paytm-Logo.wine.svg"
                className="pay-logo "
                alt="button"
                width={58}
                height={58}
              />
              <span className="unaviablee px-4">Paytm</span>
            </label>
          </div>
          <div
            id="divbhimupi"
            className={`form-check available-method ${
              activeTab === 1 && "active"
            }`}
            pay-type="bhim_upi"
            onClick={() => handleTabClick(1)}
          >
            <label
              className="form-check-label"
              style={{
                width: "75%",
                display: "flex",
                alignContent: "center",
              }}
            >
              <img
                src="https://presentations.gov.in/presgov_new/wp-content/uploads/2020/06/BHIM_Preview.png?x42937"
                className="pay-logo "
                alt="button"
                width={58}
                height={58}
              />
              <span className="unaviablee px-4">BHIM UPI</span>
            </label>
          </div>
          <div
            id="divwhatspppay"
            className={`form-check available-method ${
              activeTab === 5 && "active"
            }`}
            pay-type="whatspp_pay"
            onClick={() => handleTabClick(5)}
          >
            <label
              className="form-check-label"
              style={{
                width: "75%",
                display: "flex",
                alignContent: "center",
              }}
            >
              <img
                src="https://i.pinimg.com/564x/ea/c1/cc/eac1ccdc2b29b06ad9f6477862db2282.jpg"
                className="pay-logo "
                alt="button"
                width={58}
                height={58}
              />
              <span className="unaviablee px-4">Whatspp Pay</span>
            </label>
          </div>
        </div>
      </div>
      <div className="">
        <svg
          style={{
            width: "98%",
            height: "98px",
          }}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <path id="d" d="M0 1h360v81H0z" />
            <path id="e" d="M0 .041h28.085v29.347H0z" />
            <path
              d="M19.723 7.351c-1.64 0-4.592-.417-7.544-2.922C9.817 6.934 6.668 7.35 4.83 7.35c-.918 0-1.509-.104-1.509-.104v5.38c0 11.272 8.858 14.347 8.858 14.347s8.857-3.075 8.857-14.348v-5.38s-.492.105-1.313.105z"
              id="a"
            />
            <mask
              id="g"
              maskContentUnits="userSpaceOnUse"
              maskUnits="objectBoundingBox"
              x="-1.107"
              y="-1.107"
              width="19.929"
              height="24.76"
            >
              <path fill="#fff" d="M2.214 3.321h19.929v24.76H2.214z" />
              <use xlinkHref="#a" />
            </mask>
            <mask
              id="h"
              maskContentUnits="userSpaceOnUse"
              maskUnits="objectBoundingBox"
              x={0}
              y={0}
              width={22}
              height={21}
              fill="#fff"
            >
              <use xlinkHref="#b" />
            </mask>
            <ellipse id="b" cx={27} cy="15.5" rx={11} ry="10.5" />
            <filter
              x="-1%"
              y="-3.1%"
              width="101.9%"
              height="108.6%"
              filterUnits="objectBoundingBox"
              id="c"
            >
              <feOffset dy={1} in="SourceAlpha" result="shadowOffsetOuter1" />
              <feGaussianBlur
                stdDeviation={1}
                in="shadowOffsetOuter1"
                result="shadowBlurOuter1"
              />
              <feColorMatrix
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                in="shadowBlurOuter1"
              />
            </filter>
          </defs>
          <g fill="none" fillRule="evenodd">
            <path fill="#F1F2F4" d="M0-1246h360V190H0z" />
            <g>
              <use fill="#000" filter="url(#c)" xlinkHref="#d" />
              <use fill="#FFF" xlinkHref="#d" />
            </g>
            <path
              d="M299.631 24.435l7.434 4.292-3.042 1.756-7.434-4.292 3.042-1.756zm.675 16.732v-6.98l4.049-2.337.002-.001 3.383-1.954v6.98l-7.434 4.292zM295.24 26.97l7.434 4.292-3.043 1.757-7.433-4.292 3.042-1.757zm-3.717 2.925l7.434 4.293v6.979l-7.434-4.292v-6.98zm-1.349 7.37c0 .24.129.463.337.584l8.783 5.07c.016.01.034.013.05.021a.672.672 0 00.287.07.672.672 0 00.287-.07c.017-.008.035-.011.05-.02l8.784-5.071a.676.676 0 00.337-.585v-8.537c0-.019-.005-.036-.007-.054a.67.67 0 00-.082-.281l-.001-.003-.002-.002a.673.673 0 00-.202-.212c-.015-.01-.027-.023-.043-.032l-8.783-5.071a.673.673 0 00-.675 0l-8.783 5.07c-.015.01-.027.023-.042.033a.672.672 0 00-.203.212l-.002.002v.003a.671.671 0 00-.083.281c-.001.018-.007.035-.007.054v8.537z"
              fill="#4C505F"
            />
            <g transform="translate(286 18.013)">
              <mask id="f" fill="#fff">
                <use xlinkHref="#e" />
              </mask>
              <path
                d="M.653 7.826c.01.054.028.104.051.154.012.025.022.05.036.074a.656.656 0 00.165.181c.024.018.04.043.066.058.023.014.049.015.073.025.025.011.051.018.078.026a.646.646 0 00.165.03c.008 0 .015.004.023.004a.63.63 0 00.093-.006l4.609-.637a.674.674 0 00.576-.76.671.671 0 00-.76-.576l-3.14.434c3.96-5.41 11.461-7.09 17.394-3.665 6.358 3.67 8.544 11.83 4.873 18.187-3.67 6.359-11.802 8.56-18.124 4.91a.675.675 0 00-.675 1.168 14.455 14.455 0 0011.095 1.437 14.609 14.609 0 008.873-6.84C30.166 15.028 27.759 6.042 20.757 2 14.287-1.737 6.132.046 1.737 5.863l-.395-2.86a.674.674 0 10-1.336.185l.637 4.607c.002.01.008.02.01.03"
                fill="#4C505F"
                mask="url(#f)"
              />
            </g>
            <path
              d="M273.876 63v-.843h-3.937v-2.772h3.39v-.843h-3.39v-2.514h3.883v-.848h-4.914V63h4.968zm2.922.107c.64 0 1.192-.24 1.654-.72.036.294.083.498.14.613h1.042v-.086c-.136-.315-.204-.74-.204-1.273v-2.675c-.015-.587-.212-1.048-.591-1.383-.38-.335-.904-.502-1.574-.502-.422 0-.81.079-1.163.236a2.108 2.108 0 00-.838.642c-.205.27-.308.55-.308.84h.999c0-.253.12-.47.36-.65.24-.178.537-.268.891-.268.405 0 .71.103.919.31.207.205.311.482.311.829v.457h-.967c-.834 0-1.481.167-1.941.502-.46.335-.69.805-.69 1.41 0 .497.183.908.55 1.232.367.324.837.486 1.41.486zm.145-.864c-.326 0-.593-.088-.8-.264-.208-.175-.312-.418-.312-.73 0-.713.609-1.069 1.826-1.069h.779v1.193a1.462 1.462 0 01-.607.628c-.28.161-.575.242-.886.242zm6.182.864c.662 0 1.201-.156 1.617-.47.415-.313.623-.73.623-1.248 0-.312-.075-.576-.223-.793-.149-.216-.377-.402-.685-.555-.308-.154-.71-.287-1.206-.398-.496-.11-.839-.227-1.028-.35a.603.603 0 01-.285-.542c0-.254.102-.46.306-.617.204-.158.487-.237.849-.237.35 0 .642.099.873.296.23.197.346.431.346.703h.999c0-.53-.205-.965-.615-1.305-.41-.34-.944-.51-1.603-.51-.627 0-1.142.165-1.544.494-.403.33-.605.732-.605 1.209 0 .286.071.533.212.74.142.209.36.388.656.538.295.15.694.28 1.198.387.503.107.855.235 1.058.384a.732.732 0 01.303.625c0 .255-.114.458-.341.61-.227.152-.529.228-.905.228-.408 0-.737-.097-.986-.292a1.029 1.029 0 01-.4-.793h-.993c0 .344.1.664.303.96.202.295.483.525.84.69.359.164.77.246 1.236.246zm3.792 2.24c.788 0 1.362-.483 1.724-1.45l2.337-6.709h-1.064l-1.353 4.356-1.45-4.356h-1.086l2.074 5.748-.22.59c-.122.362-.277.61-.465.747-.188.136-.45.204-.787.204l-.269-.021v.805l.371.07.188.016zM295.774 63v-3.164h1.837L299.308 63h1.107v-.064l-1.837-3.32c.469-.179.835-.45 1.098-.81.263-.362.395-.787.395-1.274 0-.766-.237-1.35-.712-1.75-.474-.402-1.152-.602-2.033-.602h-2.589V63h1.037zm1.584-4.007h-1.584v-2.965h1.579c.544.004.96.135 1.249.392.288.258.432.629.432 1.112 0 .444-.151.799-.454 1.064-.302.265-.71.397-1.222.397zm6.413 4.114c.974 0 1.705-.374 2.192-1.122l-.607-.473a2.24 2.24 0 01-.64.57c-.243.143-.54.214-.89.214-.495 0-.902-.176-1.223-.529-.32-.352-.488-.815-.502-1.388h3.937v-.414c0-.927-.21-1.64-.628-2.137-.42-.498-1.007-.747-1.762-.747-.462 0-.89.128-1.286.384s-.704.61-.924 1.064c-.22.453-.33.967-.33 1.544v.182c0 .867.246 1.559.74 2.076.495.518 1.136.776 1.923.776zm1.273-3.544h-2.91c.064-.527.232-.936.504-1.228a1.325 1.325 0 011.01-.438c.415 0 .745.14.988.417.244.277.38.668.408 1.173v.076zm3.84 3.544c.248 0 .502-.035.763-.107v-.806c-.2.043-.358.065-.472.065-.233 0-.398-.058-.494-.175-.097-.116-.145-.29-.145-.523v-3.604h1.085v-.769h-1.085v-1.407h-.994v1.407h-1.058v.769h1.058v3.604c0 .494.113.875.338 1.144.226.268.56.402 1.005.402zm3.782 0c.748 0 1.316-.227 1.703-.682l.021.575h.945v-5.812h-.993v4.228c-.25.565-.756.848-1.515.848-.716 0-1.074-.44-1.074-1.321v-3.755h-.994v3.782c.004.705.168 1.238.492 1.598.324.36.796.54 1.415.54zm5.172-.107v-4.125c.233-.555.675-.833 1.327-.833.175 0 .338.013.489.038v-.924c-.1-.05-.247-.075-.44-.075-.599 0-1.06.26-1.386.779l-.016-.672h-.967V63h.993zm3.723 0v-4.141a1.75 1.75 0 01.569-.677c.243-.172.526-.258.849-.258.397 0 .69.1.878.301.188.2.283.51.287.93V63h.994v-3.84c-.011-1.386-.63-2.079-1.859-2.079-.716 0-1.296.28-1.74.838l-.032-.73h-.94V63h.994zm7.213.107c.662 0 1.201-.156 1.617-.47.415-.313.623-.73.623-1.248 0-.312-.075-.576-.223-.793-.149-.216-.377-.402-.685-.555-.308-.154-.71-.287-1.206-.398-.496-.11-.839-.227-1.028-.35a.603.603 0 01-.285-.542c0-.254.102-.46.306-.617.204-.158.487-.237.849-.237.35 0 .642.099.873.296.23.197.346.431.346.703h.999c0-.53-.205-.965-.615-1.305-.41-.34-.944-.51-1.603-.51-.627 0-1.142.165-1.544.494-.403.33-.605.732-.605 1.209 0 .286.071.533.212.74.142.209.36.388.656.538.295.15.694.28 1.197.387.504.107.856.235 1.059.384a.732.732 0 01.303.625c0 .255-.114.458-.341.61-.227.152-.53.228-.905.228-.408 0-.737-.097-.986-.292a1.029 1.029 0 01-.4-.793h-.993c0 .344.1.664.303.96.202.295.483.525.84.69.359.164.77.246 1.236.246z"
              fill="#4C505F"
              fillRule="nonzero"
            />
            <g>
              <path
                d="M140.82 63.107c.828 0 1.488-.19 1.982-.572.495-.38.742-.889.742-1.522 0-.398-.089-.743-.266-1.037-.177-.294-.45-.55-.817-.77-.367-.22-.875-.422-1.525-.605-.65-.183-1.11-.384-1.38-.604-.27-.22-.406-.49-.406-.809 0-.397.142-.708.427-.931.285-.224.681-.336 1.19-.336.548 0 .972.135 1.273.405.3.27.451.642.451 1.115h1.037c0-.433-.116-.833-.347-1.198a2.362 2.362 0 00-.977-.86c-.421-.207-.9-.31-1.437-.31-.788 0-1.428.2-1.92.604-.493.402-.739.912-.739 1.528 0 .544.202 1.001.604 1.372.403.37 1.047.683 1.931.937.706.204 1.193.411 1.461.62.269.21.403.506.403.89 0 .383-.145.685-.435.907-.29.222-.707.333-1.251.333-.584 0-1.05-.137-1.4-.41-.349-.275-.523-.648-.523-1.12h-1.037c0 .454.126.86.379 1.219.252.358.611.64 1.077.846.465.205.966.308 1.504.308zm6.3 0c.975 0 1.705-.374 2.192-1.122l-.607-.473a2.24 2.24 0 01-.639.57c-.243.143-.54.214-.891.214-.495 0-.902-.176-1.222-.529-.32-.352-.488-.815-.503-1.388h3.937v-.414c0-.927-.209-1.64-.628-2.137-.419-.498-1.006-.747-1.762-.747-.462 0-.89.128-1.286.384s-.704.61-.924 1.064c-.22.453-.33.967-.33 1.544v.182c0 .867.247 1.559.741 2.076.494.518 1.135.776 1.923.776zm1.274-3.544h-2.911c.064-.527.232-.936.505-1.228a1.325 1.325 0 011.01-.438c.415 0 .744.14.988.417.243.277.38.668.408 1.173v.075zm4.474 3.544c.394 0 .767-.09 1.12-.268.352-.18.634-.42.846-.72.211-.3.326-.618.343-.95h-.94c-.028.322-.175.59-.44.805a1.431 1.431 0 01-.93.322c-.511 0-.905-.18-1.18-.542-.276-.362-.414-.877-.414-1.547v-.188c0-.687.138-1.213.416-1.576.277-.364.669-.546 1.174-.546.376 0 .692.121.948.363s.398.55.427.927h.94c-.03-.624-.26-1.13-.69-1.52-.432-.39-.974-.586-1.625-.586-.53 0-.99.122-1.378.365a2.373 2.373 0 00-.894 1.026c-.208.44-.312.944-.312 1.51v.166c0 .917.234 1.639.701 2.167.467.528 1.097.792 1.888.792zm5.312 0c.748 0 1.316-.227 1.703-.682l.021.575h.945v-5.812h-.993v4.228c-.25.565-.756.848-1.515.848-.716 0-1.074-.44-1.074-1.321v-3.755h-.994v3.782c.004.705.168 1.238.492 1.598.324.36.795.54 1.415.54zm5.172-.107v-4.125c.233-.555.675-.833 1.327-.833.175 0 .338.013.489.038v-.924c-.1-.05-.247-.075-.44-.075-.599 0-1.06.26-1.386.779l-.017-.672h-.966V63h.993zm5.038.107c.974 0 1.705-.374 2.192-1.122l-.607-.473a2.24 2.24 0 01-.64.57c-.243.143-.54.214-.89.214-.495 0-.902-.176-1.223-.529-.32-.352-.488-.815-.502-1.388h3.937v-.414c0-.927-.21-1.64-.628-2.137-.42-.498-1.007-.747-1.762-.747-.462 0-.89.128-1.287.384-.395.256-.703.61-.923 1.064-.22.453-.33.967-.33 1.544v.182c0 .867.246 1.559.74 2.076.495.518 1.136.776 1.923.776zm1.273-3.544h-2.91c.064-.527.232-.936.504-1.228a1.325 1.325 0 011.01-.438c.415 0 .745.14.988.417.244.277.38.668.408 1.173v.075zM175.717 63v-3.062h1.842c.884 0 1.564-.205 2.038-.615.475-.41.712-.994.712-1.753 0-.72-.243-1.298-.728-1.735-.485-.437-1.156-.655-2.011-.655h-2.885V63h1.032zm1.853-3.905h-1.853v-3.067h1.912c.512.011.915.156 1.208.435.294.28.44.652.44 1.118 0 .49-.146.865-.44 1.125-.293.26-.716.39-1.267.39zm5.634 4.012c.64 0 1.192-.24 1.654-.72.036.294.083.498.14.613h1.042v-.086c-.136-.315-.204-.74-.204-1.273v-2.675c-.015-.587-.212-1.048-.591-1.383-.38-.335-.904-.502-1.574-.502-.422 0-.81.079-1.163.236a2.108 2.108 0 00-.838.642c-.205.27-.308.55-.308.84h.999c0-.253.12-.47.36-.65.24-.178.537-.268.891-.268.405 0 .71.103.919.31.207.205.311.482.311.829v.457h-.967c-.834 0-1.481.167-1.941.502-.46.335-.69.805-.69 1.41 0 .497.183.908.55 1.232.367.324.837.486 1.41.486zm.145-.864c-.326 0-.593-.088-.8-.264-.208-.175-.312-.418-.312-.73 0-.713.609-1.069 1.826-1.069h.779v1.193a1.462 1.462 0 01-.607.628c-.28.161-.575.242-.886.242zm4.222 3.104c.787 0 1.362-.483 1.724-1.45l2.336-6.709h-1.063l-1.354 4.356-1.45-4.356h-1.085l2.073 5.748-.22.59c-.122.362-.277.61-.465.747-.188.136-.45.204-.786.204l-.269-.021v.805l.37.07.189.016zM193.506 63v-4.243c.24-.555.685-.833 1.337-.833.827 0 1.24.423 1.24 1.268V63h1v-3.856c.04-.373.18-.67.424-.89.244-.22.55-.33.919-.33.447 0 .766.103.956.31.19.205.284.516.284.931V63h.994v-3.894c-.022-1.35-.67-2.025-1.944-2.025-.423 0-.79.086-1.099.258-.31.172-.561.397-.754.677-.294-.623-.847-.935-1.66-.935-.723 0-1.298.25-1.724.752l-.027-.645h-.94V63h.994zm11.064.107c.974 0 1.704-.374 2.191-1.122l-.606-.473a2.24 2.24 0 01-.64.57c-.243.143-.54.214-.891.214-.494 0-.902-.176-1.222-.529-.32-.352-.488-.815-.502-1.388h3.937v-.414c0-.927-.21-1.64-.629-2.137-.419-.498-1.006-.747-1.761-.747-.462 0-.891.128-1.287.384-.396.256-.703.61-.924 1.064-.22.453-.33.967-.33 1.544v.182c0 .867.247 1.559.741 2.076.494.518 1.135.776 1.923.776zm1.273-3.544h-2.911c.064-.527.233-.936.505-1.228a1.325 1.325 0 011.01-.438c.415 0 .744.14.988.417.243.277.38.668.408 1.173v.075zM208.98 63v-4.141a1.75 1.75 0 01.57-.677c.243-.172.525-.258.848-.258.397 0 .69.1.878.301.188.2.284.51.287.93V63h.994v-3.84c-.01-1.386-.63-2.079-1.859-2.079-.716 0-1.296.28-1.74.838l-.032-.73h-.94V63h.994zm6.773.107c.247 0 .501-.035.762-.107v-.806c-.2.043-.358.065-.472.065-.233 0-.398-.058-.494-.175-.097-.116-.145-.29-.145-.523v-3.604h1.085v-.769h-1.085v-1.407h-.994v1.407h-1.058v.769h1.058v3.604c0 .494.113.875.338 1.144.226.268.56.402 1.005.402zm4.033 0c.663 0 1.202-.156 1.617-.47.415-.313.623-.73.623-1.248 0-.312-.074-.576-.223-.793-.148-.216-.377-.402-.685-.555-.308-.154-.71-.287-1.205-.398-.496-.11-.84-.227-1.029-.35a.603.603 0 01-.285-.542c0-.254.102-.46.307-.617.204-.158.486-.237.848-.237.351 0 .642.099.873.296.23.197.346.431.346.703h1c0-.53-.206-.965-.616-1.305-.41-.34-.944-.51-1.603-.51-.626 0-1.141.165-1.544.494-.403.33-.604.732-.604 1.209 0 .286.07.533.212.74.141.209.36.388.655.538.296.15.695.28 1.198.387.503.107.856.235 1.058.384a.732.732 0 01.303.625c0 .255-.113.458-.34.61-.228.152-.53.228-.906.228-.408 0-.736-.097-.985-.292a1.029 1.029 0 01-.4-.793h-.994c0 .344.101.664.303.96.203.295.483.525.841.69.358.164.77.246 1.235.246z"
                fill="#4C505F"
                fillRule="nonzero"
              />
              <g transform="translate(168 17)">
                <text
                  fontFamily="Roboto-Regular, Roboto"
                  fontSize="15.5"
                  fill="#2874F0"
                >
                  <tspan x="7.986" y="21.536">
                    ₹
                  </tspan>
                </text>
                <path
                  d="M22.553 3.3c.465 0 .881-.026 1.242-.068.21-.024.35-.047.412-.06l.87-.186v8.286c0 6.98-2.365 12.315-6.305 16.19a20.398 20.398 0 01-4.34 3.263c-.52.291-1.004.53-1.441.722a8.541 8.541 0 01-.576.233l-.236.082-.236-.082a8.541 8.541 0 01-.576-.233c-.438-.191-.922-.43-1.443-.722a20.398 20.398 0 01-4.34-3.263c-3.94-3.875-6.304-9.21-6.304-16.19V3.017l.846.15c.084.014.257.039.51.064.427.043.911.068 1.439.068 3.608 0 7.03-1.089 9.58-3.793l.468-.497.521.442C15.888 2.204 19.331 3.3 22.553 3.3z"
                  stroke="#4C505F"
                  strokeWidth="1.439"
                />
                <use
                  stroke="#4C505F"
                  mask="url(#g)"
                  strokeWidth="2.214"
                  opacity=".5"
                  strokeDasharray="2.214"
                  xlinkHref="#a"
                />
              </g>
            </g>
            <g>
              <path
                d="M13.918 63l.736-2.041h3.276L18.677 63h1.058l-2.992-7.82h-.902L12.855 63h1.063zm3.706-2.89h-2.658l1.326-3.657 1.332 3.657zm4.834 2.997c.749 0 1.316-.227 1.703-.682l.021.575h.946v-5.812h-.994v4.228c-.25.565-.756.848-1.515.848-.716 0-1.074-.44-1.074-1.321v-3.755h-.993v3.782c.003.705.167 1.238.491 1.598.324.36.796.54 1.415.54zm5.876 0c.247 0 .502-.035.763-.107v-.806c-.2.043-.358.065-.473.065-.232 0-.397-.058-.494-.175-.097-.116-.145-.29-.145-.523v-3.604h1.085v-.769h-1.085v-1.407h-.994v1.407h-1.058v.769h1.058v3.604c0 .494.113.875.339 1.144.225.268.56.402 1.004.402zm2.89-.107v-4.141a1.75 1.75 0 01.57-.677c.243-.172.526-.258.848-.258.397 0 .69.1.878.301.188.2.284.51.287.93V63h.994v-3.84c-.01-1.386-.63-2.079-1.858-2.079-.706 0-1.279.27-1.72.811V54.75h-.993V63h.994zm7.476.107c.974 0 1.705-.374 2.192-1.122l-.607-.473a2.24 2.24 0 01-.64.57c-.243.143-.54.214-.89.214-.495 0-.902-.176-1.223-.529-.32-.352-.488-.815-.502-1.388h3.937v-.414c0-.927-.21-1.64-.628-2.137-.42-.498-1.007-.747-1.762-.747-.462 0-.89.128-1.286.384s-.704.61-.924 1.064c-.22.453-.33.967-.33 1.544v.182c0 .867.246 1.559.74 2.076.495.518 1.136.776 1.923.776zm1.273-3.544h-2.91c.064-.527.232-.936.504-1.228a1.325 1.325 0 011.01-.438c.415 0 .745.14.988.417.244.277.38.668.408 1.173v.075zM43.11 63v-4.141a1.75 1.75 0 01.57-.677c.243-.172.526-.258.848-.258.398 0 .69.1.878.301.188.2.284.51.288.93V63h.993v-3.84c-.01-1.386-.63-2.079-1.858-2.079-.716 0-1.296.28-1.74.838l-.033-.73h-.94V63h.994zm6.773.107c.247 0 .501-.035.763-.107v-.806c-.2.043-.358.065-.473.065-.233 0-.397-.058-.494-.175-.097-.116-.145-.29-.145-.523v-3.604h1.085v-.769h-1.085v-1.407h-.994v1.407h-1.058v.769h1.058v3.604c0 .494.113.875.339 1.144.225.268.56.402 1.004.402zm2.487-6.896c.193 0 .34-.054.44-.161.1-.108.15-.242.15-.403a.587.587 0 00-.15-.408c-.1-.111-.247-.167-.44-.167s-.34.056-.438.167a.593.593 0 00-.148.408c0 .161.05.295.148.403.099.107.245.16.438.16zM52.859 63v-5.812h-.994V63h.994zm3.92.107c.394 0 .768-.09 1.12-.268.353-.18.635-.42.846-.72.212-.3.326-.618.344-.95h-.94c-.028.322-.175.59-.44.805a1.431 1.431 0 01-.93.322c-.512 0-.905-.18-1.181-.542-.276-.362-.414-.877-.414-1.547v-.188c0-.687.14-1.213.417-1.576.277-.364.668-.546 1.173-.546.376 0 .692.121.948.363s.399.55.427.927h.94c-.029-.624-.259-1.13-.69-1.52-.432-.39-.973-.586-1.625-.586-.53 0-.989.122-1.378.365a2.373 2.373 0 00-.894 1.026c-.207.44-.311.944-.311 1.51v.166c0 .917.233 1.639.7 2.167.468.528 1.097.792 1.889.792zM64.117 63v-3.062h1.843c.884 0 1.564-.205 2.038-.615.475-.41.712-.994.712-1.753 0-.72-.243-1.298-.728-1.735-.485-.437-1.156-.655-2.012-.655h-2.884V63h1.031zm1.853-3.905h-1.853v-3.067h1.913c.512.011.914.156 1.208.435.294.28.44.652.44 1.118 0 .49-.146.865-.44 1.125-.294.26-.716.39-1.268.39zM70.863 63v-4.125c.232-.555.675-.833 1.326-.833.176 0 .339.013.489.038v-.924c-.1-.05-.247-.075-.44-.075-.598 0-1.06.26-1.386.779l-.016-.672h-.967V63h.994zm5.005.107c.523 0 .986-.125 1.389-.376.403-.25.712-.6.929-1.05.217-.449.325-.957.325-1.522v-.07c0-.91-.244-1.638-.733-2.186s-1.129-.822-1.92-.822c-.512 0-.968.124-1.367.37-.4.248-.711.599-.935 1.053a3.433 3.433 0 00-.336 1.537v.07c0 .902.245 1.627.734 2.175.488.547 1.127.821 1.914.821zm0-.81c-.5 0-.901-.196-1.2-.586-.299-.39-.449-.908-.449-1.552 0-.727.15-1.286.452-1.676.3-.39.696-.586 1.187-.586.501 0 .903.198 1.205.594.303.396.454.912.454 1.55 0 .712-.148 1.266-.445 1.662-.298.396-.699.593-1.204.593zm5.93.81c.71 0 1.262-.243 1.66-.73l.048.623h.913v-8.25h-.993v3.03c-.398-.466-.937-.699-1.617-.699-.684 0-1.237.271-1.66.814-.422.542-.634 1.26-.634 2.15v.076c0 .888.213 1.608.637 2.16.424.55.973.826 1.646.826zm.247-.843c-.48 0-.856-.186-1.128-.558-.272-.373-.408-.888-.408-1.547 0-.738.136-1.295.408-1.67.272-.377.652-.565 1.139-.565.616 0 1.072.274 1.37.822v2.67c-.29.565-.75.848-1.38.848zm5.8.843c.75 0 1.317-.227 1.704-.682l.021.575h.945v-5.812h-.993v4.228c-.25.565-.756.848-1.515.848-.716 0-1.074-.44-1.074-1.321v-3.755h-.994v3.782c.004.705.168 1.238.492 1.598.324.36.795.54 1.415.54zm6.51 0c.395 0 .768-.09 1.12-.268.353-.18.635-.42.847-.72.21-.3.325-.618.343-.95h-.94c-.028.322-.175.59-.44.805a1.431 1.431 0 01-.93.322c-.511 0-.905-.18-1.18-.542-.277-.362-.415-.877-.415-1.547v-.188c0-.687.14-1.213.417-1.576.277-.364.668-.546 1.173-.546.376 0 .692.121.948.363s.399.55.427.927h.94c-.028-.624-.258-1.13-.69-1.52-.431-.39-.973-.586-1.625-.586-.53 0-.989.122-1.377.365a2.373 2.373 0 00-.895 1.026c-.207.44-.311.944-.311 1.51v.166c0 .917.233 1.639.7 2.167.468.528 1.097.792 1.889.792zm5.125 0c.247 0 .501-.035.762-.107v-.806c-.2.043-.358.065-.472.065-.233 0-.398-.058-.494-.175-.097-.116-.145-.29-.145-.523v-3.604h1.085v-.769H99.13v-1.407h-.994v1.407h-1.058v.769h1.058v3.604c0 .494.113.875.338 1.144.226.268.56.402 1.005.402zm4.033 0c.663 0 1.202-.156 1.617-.47.415-.313.623-.73.623-1.248 0-.312-.074-.576-.223-.793-.148-.216-.377-.402-.685-.555-.307-.154-.71-.287-1.205-.398-.496-.11-.84-.227-1.029-.35a.603.603 0 01-.285-.542c0-.254.102-.46.307-.617.204-.158.487-.237.848-.237.351 0 .642.099.873.296.231.197.346.431.346.703h1c0-.53-.206-.965-.616-1.305-.41-.34-.944-.51-1.603-.51-.626 0-1.141.165-1.544.494-.403.33-.604.732-.604 1.209 0 .286.07.533.212.74.141.209.36.388.655.538.296.15.695.28 1.198.387.503.107.856.235 1.058.384a.732.732 0 01.304.625c0 .255-.114.458-.342.61-.227.152-.529.228-.905.228-.408 0-.736-.097-.985-.292a1.029 1.029 0 01-.4-.793h-.994c0 .344.101.664.303.96.203.295.483.525.841.69.358.164.77.246 1.235.246z"
                fill="#4C505F"
                fillRule="nonzero"
              />
              <g transform="translate(33 17)">
                <circle
                  stroke="#4C505F"
                  strokeWidth="1.3"
                  cx="26.5"
                  cy="15.5"
                  r="14.85"
                />
                <use
                  stroke="#4C505F"
                  mask="url(#h)"
                  strokeWidth={2}
                  opacity=".5"
                  strokeDasharray={2}
                  xlinkHref="#b"
                />
                <path
                  d="M1.499 9.65l5.267 5.627-5.33 6.073h50.13l-5.332-6.09 5.265-5.61h-50z"
                  stroke="#4C505F"
                  strokeWidth="1.3"
                  fill="#FFF"
                />
                <path
                  d="M10.422 18.599c.506 0 .955-.122 1.346-.365.392-.244.693-.59.903-1.038.21-.448.315-.97.315-1.565v-.27c0-.591-.107-1.114-.321-1.566a2.395 2.395 0 00-.91-1.042 2.5 2.5 0 00-1.342-.363 2.5 2.5 0 00-1.342.363c-.392.242-.695.59-.91 1.042-.214.452-.321.976-.321 1.57v.3c.003.58.112 1.095.328 1.542.216.446.52.79.913 1.03.393.242.84.362 1.34.362zm0-1.021c-.427 0-.753-.17-.98-.51-.227-.34-.34-.82-.34-1.437v-.294c.002-.628.117-1.105.344-1.43.227-.325.55-.488.967-.488.42 0 .745.165.971.494.227.33.34.81.34 1.445v.294c-.002.628-.115 1.106-.34 1.434-.224.328-.545.492-.962.492zm4.714.938v-2.212h.992l1.133 2.212h1.337v-.058l-1.308-2.47c.363-.163.633-.382.812-.657.178-.276.268-.62.268-1.032 0-.58-.194-1.03-.582-1.349-.387-.318-.938-.477-1.651-.477H13.89v6.043h1.245zm1.005-3.22h-1.005v-1.814h1c.335 0 .584.081.746.244.161.164.242.388.242.673 0 .28-.085.499-.257.658-.171.159-.414.238-.726.238zm4.499 3.22v-6.043h-1.245v6.043h1.245zm3.623.083a3.98 3.98 0 001.361-.222c.41-.148.727-.356.95-.625v-2.411h-2.377v.917h1.133V17.3c-.2.2-.533.299-1 .299-.465 0-.818-.162-1.059-.486-.24-.324-.36-.802-.36-1.436v-.386c.002-.628.114-1.101.335-1.42.222-.318.544-.477.967-.477.332 0 .593.08.783.241.19.16.312.414.367.76h1.212c-.075-.653-.314-1.15-.718-1.492-.404-.342-.964-.513-1.681-.513-.515 0-.964.117-1.347.35a2.257 2.257 0 00-.88 1.013c-.203.442-.305.964-.305 1.567v.411c.006.587.116 1.097.33 1.532.215.434.519.765.913.994.395.228.853.342 1.376.342zm4.644-.083v-6.043h-1.245v6.043h1.245zm2.4 0V14.54l2.423 3.976h1.245v-6.043h-1.24v3.984l-2.429-3.984h-1.245v6.043h1.245zm5.644 0l.415-1.245h2.183l.42 1.245h1.323l-2.262-6.043h-1.154l-2.25 6.043h1.325zm2.262-2.254h-1.51l.75-2.262.76 2.262zm6.533 2.254v-1h-2.644v-5.043h-1.245v6.043h3.889z"
                  fill="#2874F0"
                  fillRule="nonzero"
                />
              </g>
            </g>
            <path
              fill="#2874F0"
              d="M296.59 26.191l7.433 4.292-1.35.78-7.433-4.293z"
            />
          </g>
        </svg>{" "}
      </div>
      <div className="container">
        <div className=" flex py-4 bg-white row">
          <div className="col-6 footer-price">
            <span className="strike mrp ms-0 mb-1" id="mrp">
              ₹ {Number(cartTotalPrice) || 0}
            </span>
            <span
              className="selling_price"
              id="selling_price"
              style={{
                color: "#9a9a9a",
                margin: "0px 5px",
                textDecoration: "line-through",
              }}
            >
              ₹ {Number(cancelcartTotalPrice) || 0}
            </span>
          </div>
          <a
            href={payment.trim()}
            className="buynow-button product-page-buy col-6 btn-continue text-center btn btn-dark"
          >
            Continue
          </a>
        </div>
      </div>
    </div>
  );
};

export default checkout;
