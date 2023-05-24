import {
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { AiFillCloseCircle } from "react-icons/ai";
export default function Modal({ title, children, open, size, handleModal }) {
  return (
     <div className={`${open ? "block" : "hidden"} transition-all`}>
      <div
        className={`justify-center transition-all items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
      >
        <div
          style={{ width: size || "auto" }}
          className={`relative  my-6 mx-auto max-w-full`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            <Card>
              <CardHeader
                variant="gradient"
                color="blue"
                className="p-2 flex justify-between"
              >
                <Typography className={"self-center"} variant="h6">
                  {title || ""}
                </Typography>

                <IconButton
                  onClick={() => handleModal(false)}
                  variant="text"
                  color="white"
                >
                  <AiFillCloseCircle size={25} />
                </IconButton>
              </CardHeader>

              <CardBody>{children}</CardBody>
            </Card>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

Modal.defaultProps = {
  onClose: () => {},
};
