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

function TableCard({ children, title, addBtn,  }) {
  const navigate = useNavigate();
  return (
   <Card className={`w-full mt-16 container`}>
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-8 !min-h-[56px] p-2 px-4 flex justify-between"
      >
        <div>
          <Typography className=" gap-4 flex" variant="h6" color="white">
            <IconButton
              onClick={() => navigate(-1)}
              variant="text"
              color="green"
            >
              <AiOutlineArrowLeft className="" color="white" size={25} />
            </IconButton>{" "}
            <span className="mt-[6px] capitalize">{title}</span>
          </Typography>
        </div>
        {addBtn}
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        {children}
      </CardBody>
    </Card>
  );
}

export default TableCard;
