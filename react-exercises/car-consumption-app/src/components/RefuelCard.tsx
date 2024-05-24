import { Refuel } from "../utils/types";
import { useDispatch } from "react-redux";
import { deleteRefuel } from "../utils/reducers/refuelSlice";

const RefuelCard = ({
  id,
  date,
  carKm,
  refuelLitres,
  pricePerLitre,
  cost,
  consumption,
}: Refuel) => {
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    console.log("id", id);
    dispatch(deleteRefuel({ id }));
  };

  return (
    <div className="card">
      <ul style={{ padding: "4px 8px" }}>
        <li>Date {date}</li>
        <li>Car km {carKm}</li>
        <li>Refuel l {refuelLitres}</li>
        <li>Price / l {pricePerLitre}</li>
        <li>Cost {cost.toFixed(2) || 0}</li>
        <li>l / 100km {consumption.toFixed(2) || 0}</li>
      </ul>
      <button
        style={{ width: "100%", marginTop: 16 }}
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default RefuelCard;
