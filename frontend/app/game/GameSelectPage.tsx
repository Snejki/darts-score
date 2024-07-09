import { Card, CardBody, Image } from "@nextui-org/react";
import { useNavigate } from "@remix-run/react";

export const GameSelectPage = () => {
    const navigate = useNavigate()
    const list = [
        {
          title: "x01",
          img: "/images/fruit-1.jpeg",
          link: "x01"
        }
      ];

  return (
    <>
      <h1>Select game</h1>
      <div className="grid gap-2 grid-cols-3">
      {list.map((item, index) => (
        <Card shadow="sm" key={index} isPressable onPress={() => navigate(item.link)}>
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src={item.img}
            />
          </CardBody>
        </Card>
        
      ))}
    </div>
    </>
  );
};


