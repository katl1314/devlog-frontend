import data from "@/mock/food.json";

export default function Page() {
  const foodList = data.data;
  return (
    <div>
      {foodList.map((props) => {
        return <div key={props.id}>{props.title}</div>;
      })}
    </div>
  );
}
