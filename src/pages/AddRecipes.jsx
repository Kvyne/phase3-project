import { Button, Container, Form } from 'react-bootstrap';
import { useForm, Controller } from "react-hook-form";
import {z} from 'zod';
import NavigationBar from '../components/NavBar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from'react';
import { BASE_URL } from '../utils';

const schema = z.object({
    name: z.string({
        required_error: 'Name is required',
    })
    .min(1, {message:'Name is required'}),
    description: z.string({
        required_error: 'description is required',
    })
    .min(1, {message:'Description is required'}),
    image: z.string({
        required_error: 'Image is required',
    })
    .min(1, {message:'Image is required'})
    .url({message:'Enter a valid image url'}),
    category: z.string({
        required_error: 'category is required',
    })
    .min(1, {message:'category is required'}),
    chef: z.string({
        required_error: 'chef is required',
    })
    .min(1, {message:'chef is required'}),
});

const AddRecipe = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
        .then((data) => {
            setCategories(data);
        })
        .catch((err) => console.log(err));
    }, []);

    const { control, handleSubmit, formState } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            description: "",
            image: "",
            category: "",
            chef: ""
        },
    });

  const onSubmit = async (values) => {
    await fetch (`${BASE_URL}/catalogue`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...values,
        
            category: Number(values.category),
         }),
  }).then((res) => res.json()).then(data => console.log(data)).catch((err) => console.log(err)); 
  };
  return (
    <Container>
        <NavigationBar />

        <Form onSubmit = { handleSubmit (onSubmit)}>
            <Controller 
            name='name'
            control={control} 
            render={({ field, fieldState }) => (
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                type="text" 
                name="name" 
                placeholder="name"
                {...field}
                />
                    {fieldState.invalid && (
                                        <Form.Text className="text-danger">
                                        {fieldState.error.message}
                                        </Form.Text>
                    )}
                </Form.Group>
            )}
            />

    <Controller 
            name='description'
            control={control} 
            render={({ field, fieldState }) => (
                <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                as="textarea" 
                placeholder="description"
                {...field}
                />
                    {fieldState.invalid && (
                                        <Form.Text className="text-danger">
                                        {fieldState.error.message}
                                        </Form.Text>
                    )}
                </Form.Group>
            )}
            />

            <Controller 
            name='image'
            control={control} 
            render={({ field, fieldState }) => (
                <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control 
                type="url" 
                placeholder="Image"
                {...field}
                />
                    {fieldState.invalid && (
                                        <Form.Text className="text-danger">
                                        {fieldState.error.message}
                                        </Form.Text>
                    )}
                </Form.Group>
            )}
            />

            <Controller 
            name='category'
            control={control} 
            render={({ field, fieldState }) => (
                <Form.Group className="mb-3">
                <Form.Label>category</Form.Label>

                <Form.Select aria-label="Default select example" {...field}>
                    
      <option>select Category</option>
      {categories.map((category) =>(
        <option key ={category.id} value = {category.id}>
            {category.name}
    
        </option>
      ))}
    </Form.Select>
                    {fieldState.invalid && (
                                        <Form.Text className="text-danger">
                                        {fieldState.error.message}
                                        </Form.Text>
                    )}
                </Form.Group>
            )}
            />


            <Controller 
            name='chef'
            control={control} 
            render={({ field, fieldState }) => (
                <Form.Group className="mb-3">
                <Form.Label>Chef</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Chef"
                {...field}
                />
                    {fieldState.invalid && (
                                        <Form.Text className="text-danger">
                                        {fieldState.error.message}
                                        </Form.Text>
                    )}
                </Form.Group>
            )}
            />




        <Button variant="primary" 
                type="submit" 
                disabled = {formState.isSubmitting}>
            {formState.isSubmitting ? "saving..." : "submit"}
        </Button>
    </Form>
    </Container>
    );
}

export default AddRecipe
