import Row from "../components/Row";
import ListProducts from "../components/ListProducts";
import { sampleProducts } from "../data";

export default function HomePage() {
  return (
    <Row>
      <ListProducts products={sampleProducts} />
    </Row>
  );
}
