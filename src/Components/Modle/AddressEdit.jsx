import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

const AddressEdit = ({ initialData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Updated Data:", data);
    toast.success("Address Updated Successfully!");
  };

  return (
    <Modal>
      <Button className="bg-amber-500 text-white px-8 py-2 rounded-lg flex items-center gap-2">
        <MdEdit /> Edit Address
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Address</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={handleSubmit}>
                  
                  {/* Address Field */}
                  <TextField variant="secondary" defaultValue={initialData?.address} >
                    <Label>Address</Label>
                    <Input name="address"  />
                  </TextField>

                  {/* Phone Field */}
                  <TextField variant="secondary" defaultValue={initialData?.phone}>
                    <Label>Phone</Label>
                    <Input name="phone" />
                  </TextField>

                  {/* Email Field */}
                  <TextField variant="secondary" defaultValue={initialData?.email}>
                    <Label>Email</Label>
                    <Input name="email" type="email"  />
                  </TextField>

                  <div className="col-span-1 sm:col-span-2 flex justify-end gap-2 mt-2">
                    <Button type="reset" variant="secondary">Cancel</Button>
                    <Button type="submit" className="bg-amber-500 text-white">Save Changes</Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default AddressEdit;