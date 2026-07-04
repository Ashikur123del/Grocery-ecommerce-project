import { useState } from "react";
import { HiPlus, HiSupport, HiClock, HiCheckCircle } from "react-icons/hi";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { toast } from "react-toastify";

const SupportUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState([
    {
      id: "TK-8492",
      subject: "Payment successful but order pending",
      category: "Billing & Payments",
      priority: "High",
      status: "Pending",
      date: "02 July, 2026",
    },
    {
      id: "TK-3012",
      subject: "Unable to apply promo code GBAPP10",
      category: "Offers & Coupons",
      priority: "Medium",
      status: "Solved",
      date: "28 June, 2026",
    },
  ]);

  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "High",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject || !formData.category) {
      toast.error("Please fill out Subject and Category fields.");
      return;
    }

    const newTicket = {
      id: `TK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: formData.subject,
      category: formData.category,
      priority: formData.priority,
      status: "Pending",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };

    setTickets([newTicket, ...tickets]);

    setFormData({ subject: "", category: "", priority: "High", message: "" });
    setIsModalOpen(false);
  };

  const getStatusBadge = (status) => {
    if (status === "Pending") {
      return (
        <span className="flex items-center gap-1 max-w-max bg-amber-50 text-amber-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-200">
          <HiClock size={14} /> Pending
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 max-w-max bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
        <HiCheckCircle size={14} /> Solved
      </span>
    );
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen w-full text-slate-800">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <HiSupport className="text-amber-500" size={24} /> Support Ticket
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Create and manage your support tickets
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-amber-500/10 max-w-max"
        >
          <HiPlus size={18} />
          <span>Create New Ticket</span>
        </button>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 px-1">
          Your Tickets ({tickets.length})
        </h2>

        {tickets.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
            <div className="bg-slate-100 p-4 rounded-full text-slate-400 mb-3">
              <HiSupport size={40} />
            </div>
            <h3 className="font-bold text-slate-700 text-base">
              No Tickets Found
            </h3>
            <p className="text-sm text-slate-400 max-w-xs mt-1">
              If you are facing any problem, please create a ticket. Our team
              will help you.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                      {ticket.id}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      Opened on {ticket.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-800 hover:text-amber-500 cursor-pointer transition-colors">
                    {ticket.subject}
                  </h3>

                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                    <p>
                      Category:{" "}
                      <span className="text-slate-700 font-semibold">
                        {ticket.category}
                      </span>
                    </p>
                    <p className="flex items-center gap-1">
                      Priority:
                      <span
                        className={`font-semibold ${ticket.priority === "High" ? "text-red-500" : "text-blue-500"}`}
                      >
                        {ticket.priority}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-50">
                  {getStatusBadge(ticket.status)}

                  <button
                    onClick={() => console.log(`Viewing ticket ${ticket.id}`)}
                    className="text-xs font-bold text-slate-600 hover:text-amber-500 bg-slate-50 hover:bg-amber-50 px-4 py-2 rounded-lg border border-slate-200 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger onClick={() => setIsModalOpen(false)} />

              <Modal.Header>
                <Modal.Icon className="bg-amber-100 text-amber-600">
                  <Envelope className="size-5" />
                </Modal.Icon>
                <Modal.Heading>Create Support Ticket</Modal.Heading>
                <p className="mt-1.5 text-sm leading-5 text-muted">
                  Fill out the form below and our support team will get back to
                  you as soon as possible.
                </p>
              </Modal.Header>

              <form onSubmit={handleFormSubmit}>
                <Modal.Body className="p-6">
                  <Surface variant="default">
                    <div className="flex flex-col gap-4">
                      <TextField className="w-full" variant="secondary">
                        <Label>Subject</Label>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="e.g., Payment success but order pending"
                        />
                      </TextField>

                      <TextField className="w-full" variant="secondary">
                        <Label>Category</Label>
                        <Input
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          placeholder="e.g., Billing, Delivery, Refund"
                        />
                      </TextField>

                      <TextField className="w-full" variant="secondary">
                        <Label>Priority</Label>
                        <Input
                          name="priority"
                          value={formData.priority}
                          onChange={handleInputChange}
                          placeholder="High, Medium, Low"
                        />
                      </TextField>

                      <TextField className="w-full" variant="secondary">
                        <Label>Message / Description</Label>
                        <Input
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Describe your problem in detail..."
                        />
                      </TextField>
                    </div>
                  </Surface>
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button> 
                  <Button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    Submit Ticket
                  </Button>
                </Modal.Footer>
              </form>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default SupportUser;
