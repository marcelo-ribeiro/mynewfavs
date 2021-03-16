import { useEffect } from "react";

function Modal(
  { isActive, title, ...props } = {
    isActive: false,
    title: "",
  }
) {
  useEffect(() => {
    isActive && document.querySelector(".modal")?.querySelectorAll("input")[0]?.focus();
  }, [isActive]);

  return (
    <section className={`modal ${isActive ? "modal--active" : ""}`}>
      <div className="modal__box">
        <header className="modal__box__header">
          <h1 className="title">{title}</h1>
        </header>

        <div className="modal__box__content">{props.children}</div>
      </div>
    </section>
  );
}

export default Modal;
