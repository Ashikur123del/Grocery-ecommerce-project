import { Check } from "@gravity-ui/icons";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { MdEdit, MdOutlineCancel } from "react-icons/md";

const AddProduct = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      sku: "",
      name: "",
      category: "",
      brand: "",
      price: "",
      discountPrice: "",
      stockQuantity: "",
      unit: "dozen",
      inStock: true,
      rating: 4.5,
      description: "",
      origin: "Bangladesh",
      expiryDate: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex gap-x-3 text-orange-400">
          Add New Product{" "}
          <span className="text-blue-600">
            <MdEdit />
          </span>
        </h1>

        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          {/* Text Fields */}
          {[
            "sku",
            "name",
            "category",
            "brand",
            "price",
            "discountPrice",
            "stockQuantity",
          ].map((field) => (
            <Controller
              key={field}
              name={field}
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField isRequired>
                  <Label className="capitalize">{field}</Label>
                  <Input
                    value={value}
                    onChange={onChange}
                    placeholder={`Enter ${field}`}
                  />
                </TextField>
              )}
            />
          ))}

          {/* Select: Unit */}
          <Controller
            name="unit"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                selectedKey={value}
                onSelectionChange={onChange}
                label="Unit"
              >
                <Select.Trigger>
                  <Select.Value />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="dozen">Dozen</ListBox.Item>
                    <ListBox.Item id="kg">KG</ListBox.Item>
                    <ListBox.Item id="piece">Piece</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            )}
          />

          {/* Select: Origin */}
          <Controller
            name="origin"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                selectedKey={value}
                onSelectionChange={onChange}
                label="Origin"
              >
                <Select.Trigger>
                  <Select.Value />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Bangladesh">Bangladesh</ListBox.Item>
                    <ListBox.Item id="India">India</ListBox.Item>
                    <ListBox.Item id="China">China</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            )}
          />

          <div className="col-span-2 flex gap-2 mt-4">
            <Button type="submit" className="bg-amber-500 rounded-sm">
              <Check /> Add Product
            </Button>
            <Button
              type="button"
              className="px-5 py-2.5 rounded-lg bg-slate-200 text-slate-700 font-medium
  hover:bg-slate-300
  transition-all duration-200"
              onPress={() => reset()}
            >
              <span className="text-amber-500"><MdOutlineCancel /> </span> Cencel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
