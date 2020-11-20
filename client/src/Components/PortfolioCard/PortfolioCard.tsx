import * as React from "react";
import Card from "antd/es/card";
import Typography from "antd/es/typography";

const { Meta } = Card;
const { Paragraph } = Typography;

type PortfolioCardType = {
  title: string;
  description: string;
};

export const PortfolioCard = (props: PortfolioCardType) => {
  const { title, description } = props;
  return (
    <Card
      hoverable
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          height="150px"
        />
      }
    >
      <Meta
        title={title}
        description={
          <Paragraph ellipsis={{ rows: 5 }}>{description}</Paragraph>
        }
      />
    </Card>
  );
};
