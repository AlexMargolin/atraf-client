import { FC, useRef } from "react";
import { NavigateTo } from "@/router";
import { makeClasses } from "@/hooks";
import { Card, Button } from "@/components";
import modules from "./notfound.module.scss";
import Modal, { ModalHandle } from "@/base/modal";

const classes = makeClasses(modules);

export const classNames = {
  root: "notfound",
  card: "notfound__card",
  title: "notfound__title",
  subtitle: "notfound__subtitle",
  buttons: "notfound__buttons",
};

const Notfound: FC = () => {
  const modalHandler = useRef<ModalHandle>();

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
          ref={modalHandler}
          __activator={
            <Button variant='outlined' color='secondary'>
              Read some Lorem Ipsum
            </Button>
          }
        >
          <Card flat className={classes(classNames.card)}>
            <Card.Title>wth...?</Card.Title>

            <Card.Content>
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
            </Card.Content>

            <Card.Actions>
              <Button
                color='secondary'
                onClick={() => modalHandler.current.close()}
              >
                That was great, thank you!
              </Button>
            </Card.Actions>
          </Card>
        </Modal>
      </div>
    </div>
  );
};

export default Notfound;
