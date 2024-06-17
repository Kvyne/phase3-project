import { Card, Button } from "react-bootstrap"
function RecipeCard(props) {
  const {name, id, chef, description, image, category} = props;
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Img 
        variant="top" 
        src={image} 
        height={400}
        />
    <Card.Body>
      <Card.Title>{ name }</Card.Title>
      <Card.Text>
        Chef:{chef}
      </Card.Text>
      <Button variant="primary">View</Button>

    </Card.Body>
  </Card>
  )
}

export default RecipeCard