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
import { toast } from "react-toastify";

const AddProduct = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      sku: "",
      name: "",
      category: "Electronics",
      brand: "",
      price: "",
      discountPrice: "",
      stockQuantity: "",
      unit: "dozen",
      origin: "Bangladesh",
      image: null,
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    toast.success("Product added successfully!");
    reset();
  };

  const categoryOptions = [
    { id: "Electronics", label: "Electronics" },
    { id: "Clothing", label: "Clothing" },
    { id: "Books", label: "Books" },
    { id: "Home & Garden", label: "Home & Garden" },
    { id: "Toys", label: "Toys" },
  ];

  // Helper to render a text field with Controller
  const renderTextField = (name, placeholder, label) => (
    <Controller
      key={name}
      name={name}
      control={control}
      rules={{ required: `${label || name} is required` }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField className="w-full">
          <Label className="text-white text-sm font-semibold mb-1 block capitalize">
            {label || name}
          </Label>
          <Input
            value={value}
            onChange={onChange}
            placeholder={placeholder || `Enter ${name}`}
            className={`w-full bg-slate-700 text-white border rounded-lg px-4 py-2 ${
              error ? "border-red-500" : "border-slate-600"
            }`}
          />
          {error && (
            <span className="text-red-500 text-xs mt-1 block">{error.message}</span>
          )}
        </TextField>
      )}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-x-3 text-amber-400">
          Add New Product
          <span className="text-amber-500"><MdEdit /></span>
        </h1>

        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Row 1: SKU & Name */}
          {renderTextField("sku", "Enter SKU", "SKU")}
          {renderTextField("name", "Enter product name", "Name")}

          {/* Row 2: Brand & Price */}
          {renderTextField("brand", "Enter brand", "Brand")}
          {renderTextField("price", "Enter price", "Price")}

          {/* Row 3: Discount Price & Stock Quantity */}
          {renderTextField("discountPrice", "Enter discount price", "Discount Price")}
          {renderTextField("stockQuantity", "Enter stock quantity", "Stock Quantity")}

          {/* Row 4: Category & Image (side by side) */}
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="w-full">
                <Label className="text-white text-sm font-semibold mb-1 block">Category</Label>
                <Select
                  selectedKey={value}
                  onSelectionChange={(key) => onChange(key)}
                  className="w-full"
                >
                  <Select.Trigger
                    className={`bg-slate-700 text-white border rounded-lg px-4 py-2 ${
                      error ? "border-red-500" : "border-slate-600"
                    }`}
                  >
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {categoryOptions.map((cat) => (
                        <ListBox.Item key={cat.id} id={cat.id}>
                          {cat.label}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
                {error && <span className="text-red-500 text-xs block">{error.message}</span>}
              </div>
            )}
          />

          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="w-full">
                <Label className="text-white text-sm font-semibold mb-1 block">Product Image</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    onChange(file);
                  }}
                  className={`w-full bg-slate-700 text-white border rounded-lg px-4 py-2 ${
                    error ? "border-red-500" : "border-slate-600"
                  }`}
                />
                {value && (
                  <p className="text-green-400 text-xs mt-1">
                    Selected: {value.name}
                  </p>
                )}
                {error && <span className="text-red-500 text-xs block">{error.message}</span>}
              </div>
            )}
          />

          {/* Row 5: Unit & Origin */}
          <Controller
            name="unit"
            control={control}
            rules={{ required: "Unit is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="w-full">
                <Label className="text-white text-sm font-semibold mb-1 block">Unit</Label>
                <Select selectedKey={value} onSelectionChange={onChange} className="w-full">
                  <Select.Trigger
                    className={`bg-slate-700 text-white border rounded-lg px-4 py-2 ${
                      error ? "border-red-500" : "border-slate-600"
                    }`}
                  >
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
                {error && <span className="text-red-500 text-xs block">{error.message}</span>}
              </div>
            )}
          />

          <Controller
            name="origin"
            control={control}
            rules={{ required: "Origin is required" }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="w-full">
                <Label className="text-white text-sm font-semibold mb-1 block">Origin</Label>
                <Select selectedKey={value} onSelectionChange={onChange} className="w-full">
                  <Select.Trigger
                    className={`bg-slate-700 text-white border rounded-lg px-4 py-2 ${
                      error ? "border-red-500" : "border-slate-600"
                    }`}
                  >
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
                {error && <span className="text-red-500 text-xs block">{error.message}</span>}
              </div>
            )}
          />

          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 flex flex-wrap gap-3 mt-4">
            <Button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Check /> Add Product
            </Button>
            <Button
              type="button"
              className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
              onPress={() => reset()}
            >
              <MdOutlineCancel className="text-amber-400" /> Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;