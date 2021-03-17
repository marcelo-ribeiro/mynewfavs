import styles from "./Favs.module.scss";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import { useState } from "react";
import Modal from "../../components/modal";

function Favs() {
  const favDefault = () => ({ name: "", uri: "", clicks: 0 });
  const [fav, setFav] = useState(favDefault());
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { data: user } = useUser();
  const favsCollection = useFirestore().collection("favs");
  const userFavsCollection = favsCollection.doc(user?.uid).collection("favs");
  const { status, data: favs } = useFirestoreCollectionData(userFavsCollection.orderBy("clicks", "desc"));
  const urlBase = "http://favsapi.beepix.com.br/api/icon?uri=";

  const submitFav = (event) => {
    event.preventDefault();
    if (!editMode) {
      userFavsCollection.add({ ...fav, createdAt: new Date() });
    } else {
      const { NO_ID_FIELD, ...rest } = fav;
      userFavsCollection.doc(NO_ID_FIELD).update({ ...rest, updatedAt: new Date() });
    }
    hideModal();
  };
  const editFav = (fav) => {
    setEditMode(true);
    setFav({ ...fav });
    setModalIsVisible(true);
  };
  const deleteFav = ({ NO_ID_FIELD }) => {
    if (confirm("Esse item será excuído.")) {
      userFavsCollection.doc(NO_ID_FIELD).delete();
    }
  };
  const increaseFavClicks = ({ NO_ID_FIELD, ...fav }) => {
    userFavsCollection.doc(NO_ID_FIELD).update({ ...fav, clicks: fav.clicks + 1 });
  };
  const hideModal = () => {
    setModalIsVisible(false);
    setTimeout(() => {
      setFav(favDefault());
      editMode && setEditMode(false);
    }, 300);
  };

  if (status === "loading") {
    return (
      <div className="container">
        <p data-text="center">Carregando seus favoritos...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <section className={styles.favs}>
          <button
            className={`${styles.fav__link}`}
            style={{
              "--has-icon": 0,
              "--bgcolor": "var(--color-primary)",
              "--color": "#fff",
              "--hover-bgcolor": "var(--color-primary-tint)",
              "--hover-color": "#fff",
            }}
            title="Adicionar favorito"
            onClick={() => setModalIsVisible(true)}
          >
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </button>
          {favs.map((item) => (
            <div className={styles.fav} key={item.NO_ID_FIELD}>
              <a
                className={styles.fav__link}
                href={item.uri}
                target="_blank"
                title={`Acessar ${item.name}`}
                onClick={() => increaseFavClicks(item)}
              >
                <img className="list--icon" src={urlBase + new URL(item.uri).origin} alt={item.name} />
                <span>{item.name}</span>
              </a>

              <div className={styles.fav__menu}>
                <button
                  className="button button--circle button--circle--small p-0 no-border"
                  onClick={() => editFav(item)}
                  title="Editar favorito"
                >
                  <svg
                    className="icon icon-edit"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>

      <Modal title={editMode ? "Editar favorito" : "Adicionar favorito"} isActive={modalIsVisible}>
        <form className="grid" onSubmit={submitFav}>
          <label className="field col">
            <div className="field__label">Nome</div>
            <input
              type="text"
              className="field__input"
              required
              value={fav.name}
              placeholder="Digite aqui..."
              onChange={(e) => setFav({ ...fav, name: e.target.value })}
            />
          </label>

          <label className="field col">
            <div className="field__label">URL</div>
            <input
              type="url"
              className="field__input"
              required
              value={fav.uri}
              placeholder="Digite aqui..."
              onChange={(e) => setFav({ ...fav, uri: e.target.value })}
            />
          </label>

          <div className="grid mt-0-5">
            <button className="button" type="button" data-flex="grow" onClick={hideModal}>
              Cancelar
            </button>
            {editMode && (
              <button className="button" type="button" onClick={() => deleteFav(fav)}>
                Excluir
              </button>
            )}
            <button className="button color-primary" type="submit" data-flex="grow">
              Salvar
            </button>
          </div>

          {/* <div className="grid margin-top" data-flex="justify-center">
            <button className="button button--transparent color-danger" type="button" onClick={() => deleteFav(fav)}>
              Excluir
            </button>
          </div> */}
        </form>
      </Modal>
    </>
  );
}

export default Favs;
