import { NavigateTo } from "@/router";
import { makeClasses } from "@/hooks";
import modules from "./notfound.module.scss";
import { FC, useRef, useState } from "react";
import Modal, { ModalHandle } from "@/base/modal";
import { Card, Button, Line } from "@/components";

const classes = makeClasses(modules);

export const classNames = {
  root: "notfound",
  title: "notfound__title",
  subtitle: "notfound__subtitle",
  buttons: "notfound__buttons",
  lorem: {
    root: "notfound__lorem",
    buttons: "notfound__lorem-buttons",
  },
};

const Notfound: FC = () => {
  const modalController = useRef<ModalHandle>();
  const [lorem, setLorem] = useState(false);

  return (
    <div className={classes(classNames.root)}>
      <h1 className={classes(classNames.title)}>Page not found</h1>

      <p className={classes(classNames.subtitle)}>
        Good news!
        <br />
        It&apos;s not you, its us!
      </p>

      <div className={classes(classNames.buttons)}>
        <Button color='primary' onClick={() => NavigateTo("home")}>
          Head back home
        </Button>

        <Modal
          ref={modalController}
          __activator={
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => setLorem(!lorem)}
            >
              Read some Lorem Ipsum
            </Button>
          }
        >
          <Card flat className={classes(classNames.lorem.root)}>
            <h2>Really...? oh well</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Assumenda atque blanditiis, corporis, cumque ea
              enim, esse hic modi nulla omnis placeat provident
              suscipit veniam? Blanditiis dignissimos quibusdam quos!
              Laudantium, magnam, recusandae! Debitis enim harum nulla
              odio praesentium. Ab aperiam consequatur, distinctio
              eius, eum eveniet facere in ipsam minus mollitia non
              perferendis quam quas qui quos repellendus repudiandae
              rerum sapiente sed tempora tempore ullam vero? Autem
              fuga iste iusto odio quasi.
            </p>

            <Line />

            <div className={classes(classNames.lorem.buttons)}>
              <Button
                grow
                size='small'
                color='secondary'
                onClick={() => modalController.current.close()}
              >
                That was great, thank you
              </Button>
            </div>
          </Card>
        </Modal>
      </div>
    </div>
  );
};

export default Notfound;
