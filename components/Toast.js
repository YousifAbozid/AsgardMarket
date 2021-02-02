const Toast = ({ message, handleShow, bgColor }) => {
    return (
        <div
            className={`toast show position-fixed text-light ${bgColor}`}
            style={{ top: "5px", right: "5px", zIndex: 9, minWidth: "280px" }}
        >
            <div className={`toast-header text-light ${bgColor}`}>
                <strong className="mr-auto text-light" style={{ width: "90%" }}>
                    {message.title}
                </strong>
                <button
                    type="button"
                    className="ml-2 mb-1 close btn-close text-light"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                    style={{ outline: "none" }}
                    onClick={handleShow}
                ></button>
            </div>
            <div className="toast-body">{message.body}</div>
        </div>
    )
}

export default Toast

// <div
//     className={`toast show position-fixed text-light ${bgColor}`}
//     role="alert"
//     aria-live="assertive"
//     aria-atomic="true"
// >
//     <div className="toast-header">
//         {/* <img src="..." className="rounded me-2" alt="..." />
//         <strong className="me-auto">Bootstrap</strong>
//         <small>11 mins ago</small> */}
//         <button
//             type="button"
//             className="btn-close"
//             data-bs-dismiss="toast"
//             aria-label="Close"
//         ></button>
//     </div>
//     <div className="toast-body">
//         Hello, world! This is a toast message.
//     </div>
// </div>
