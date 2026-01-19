import "../styles/modal.css"
export function Modal({ setShowModal, children }) {
    return (

        <>
            <div className="backdrop" onClick={() => setShowModal(false)}>
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </>
    );
}