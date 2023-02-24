import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { BiPlus } from "react-icons/bi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function TableCard({ children, title, addClick, className }) {
  const navigate = useNavigate();
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-8 p-2 flex justify-between"
      >
        <Typography className=" gap-4 flex" variant="h6" color="white">
          <IconButton onClick={() => navigate(-1)} variant="text">
            <AiOutlineArrowLeft className="" color="white" size={25} />
          </IconButton>{" "}
          <span className="mt-[6px]">{title}</span>
        </Typography>
        {addClick && (
          <IconButton onClick={addClick} variant="text">
            <BiPlus size={25} className="text-white" />
          </IconButton>
        )}
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        {children}
      </CardBody>
    </Card>
  );
}

export default TableCard;
