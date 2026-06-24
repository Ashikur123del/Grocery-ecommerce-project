
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

const EditInfoModal = ({ initialData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("Submitted Data:", data);
    toast.success("Success Changes And Update");
  };

  return (
    <Modal>
      <Button className="bg-amber-500 text-white px-8 py-2 rounded-lg">
        <MdEdit /> Edit
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Edit Information</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextField variant="secondary" defaultValue={initialData?.name}><Label>Name</Label><Input name="name"  /></TextField>
                  <TextField variant="secondary" defaultValue={initialData?.Email}><Label>Email</Label><Input name="email" type="email" /></TextField>
                  <TextField variant="secondary" defaultValue={initialData?.Phone}><Label>Phone</Label><Input name="phone" type="tel" /></TextField>
                  <TextField variant="secondary" defaultValue={initialData?.Country}><Label>Country</Label><Input name="country" /></TextField>
                  <TextField variant="secondary" defaultValue={initialData?.City}><Label>City</Label><Input name="city" /></TextField>
                  <TextField variant="secondary" defaultValue={initialData?.ZIPCode}><Label>ZIP Code</Label><Input name="zipCode" /></TextField>
                  <TextField className="col-span-1 sm:col-span-2" variant="secondary"  defaultValue={initialData?.Address}>
                    <Label>Address</Label><Input name="address" />
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

export default EditInfoModal;