

import { useState } from 'react';

import { Table, Input, Calendar, DateField, DatePicker, Label } from "@heroui/react";
import { BsCalculator as BsCalcIcon } from "react-icons/bs";
import { IoIosArrowRoundDown } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

const ManageSpecialDay = () => {
  const [specialDays, setSpecialDays] = useState([
    { id: "SD-101", title: "Eid-ul-Fitr Mega Offer", date: "2026-07-05", discount: "20" },
    { id: "SD-102", title: "Friday Flash Sale", date: "2026-07-10", discount: "15" },
    { id: "SD-103", title: "Monsoon Discount", date: "2026-07-25", discount: "10" },
  ]);

  const [title, setTitle] = useState('');
  const [discount, setDiscount] = useState('');
  const [dateValue, setDateValue] = useState(null);

  const handleAddDay = (e) => {
    e.preventDefault();
    if (!title || !dateValue) return alert("Please fill required fields (Title & Date)!");

    const formattedDate = dateValue.toString(); 

    const newDay = {
      id: `SD-${Math.floor(100 + Math.random() * 900)}`, 
      title,
      date: formattedDate,
      discount: discount || '0',
    };

    setSpecialDays([newDay, ...specialDays]); 
    setTitle(''); 
    setDiscount('');
    setDateValue(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this special day?")) {
      setSpecialDays(specialDays.filter(day => day.id !== id));
    }
  };

  const formatDate = (dateStr) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white min-h-screen antialiased text-gray-900">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-6 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <BsCalcIcon className="text-blue-600 text-xl" /> Manage Special Days
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure promotional campaigns, holidays, and custom event discounts.
          </p>
        </div>
        <div className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full self-start md:self-center">
          Active Events: {specialDays.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
        <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm sticky top-6">
          <h3 className="text-base font-bold text-gray-900 mb-1">Create Event</h3>
          <p className="text-xs text-gray-400 mb-5">Launch a new time-limited discount campaign.</p>
          
          <form onSubmit={handleAddDay} className="space-y-5">
            
    
            <div className="flex flex-col gap-1">
              <Label htmlFor="event-title" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Event Title
              </Label>
              <Input 
                id="event-title"
                aria-label="Event Title" 
                placeholder="e.g., Year End Sale" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
                type="text"
              />
            </div>

            <div className="grid grid-cols-1 gap-5">
              <div>
                <DatePicker 
                  className="w-full" 
                  name="date"
                  value={dateValue}
                  onChange={setDateValue}
                >
                  <Label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                    Target Date
                  </Label>
                  <DateField.Group fullWidth className="border border-gray-200 rounded-xl bg-gray-50 px-3 py-2.5 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition duration-200">
                    <DateField.Input className="text-sm text-gray-800">
                      {(segment) => <DateField.Segment segment={segment} />}
                    </DateField.Input>
                    <DateField.Suffix>
                      <DatePicker.Trigger className="text-gray-400 hover:text-gray-600 transition">
                        <DatePicker.TriggerIndicator />
                      </DatePicker.Trigger>
                    </DateField.Suffix>
                  </DateField.Group>
                  <DatePicker.Popover>
                    <Calendar aria-label="Event date" className="bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                      <Calendar.Header className="flex items-center justify-between pb-2">
                        <Calendar.YearPickerTrigger className="flex items-center gap-1 font-semibold text-sm text-gray-700">
                          <Calendar.YearPickerTriggerHeading />
                          <Calendar.YearPickerTriggerIndicator />
                        </Calendar.YearPickerTrigger>
                        <div className="flex gap-1">
                          <Calendar.NavButton slot="previous" className="p-1 rounded-md hover:bg-gray-100" />
                          <Calendar.NavButton slot="next" className="p-1 rounded-md hover:bg-gray-100" />
                        </div>
                      </Calendar.Header>
                      <Calendar.Grid>
                        <Calendar.GridHeader>
                          {(day) => <Calendar.HeaderCell className="text-xs font-medium text-gray-400 w-8 h-8 flex items-center justify-center">{day}</Calendar.HeaderCell>}
                        </Calendar.GridHeader>
                        <Calendar.GridBody>
                          {(date) => <Calendar.Cell date={date} className="w-8 h-8 flex items-center justify-center text-sm rounded-lg hover:bg-blue-50 cursor-pointer data-[selected=true]:bg-blue-600 data-[selected=true]:text-white" />}
                        </Calendar.GridBody>
                      </Calendar.Grid>
                      <Calendar.YearPickerGrid>
                        <Calendar.YearPickerGridBody>
                          {({year}) => <Calendar.YearPickerCell year={year} className="p-2 text-sm text-center rounded-lg hover:bg-blue-50 cursor-pointer" />}
                        </Calendar.YearPickerGridBody>
                      </Calendar.YearPickerGrid>
                    </Calendar>
                  </DatePicker.Popover>
                </DatePicker>
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="discount-rate" className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Discount (%)
                </Label>
                <Input 
                  id="discount-rate"
                  type="number" 
                  aria-label="Discount" 
                  placeholder="0" 
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-amber-500 hover:bg-amber-600 hover:scale-105 text-white font-semibold py-3 px-4 rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer mt-2"
            >
              Deploy Special Day
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          {specialDays.length === 0 ? (
            <div className="text-center py-16 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400">
              <span className="text-3xl block mb-2">🍃</span>
              <p className="text-sm font-medium">No special days active right now.</p>
              <p className="text-xs text-gray-400 mt-1">Use the form on the left to deploy your first event.</p>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-2xl shadow-sm overflow-hidden bg-white">
              <Table variant="secondary">
                <Table.ScrollContainer>
                  <Table.Content aria-label="Special Days Live Dashboard" className="min-w-[600px]">
                    <Table.Header  className="bg-amber-500">
                      <Table.Column className="bg-gray-50/70 text-gray-500 text-xs font-bold uppercase tracking-wider py-4">ID</Table.Column>
                      <Table.Column className="bg-gray-50/70 text-gray-500 text-xs font-bold uppercase tracking-wider py-4">Campaign Name</Table.Column>
                      <Table.Column className="bg-gray-50/70 text-gray-500 text-xs font-bold uppercase tracking-wider py-4">Date</Table.Column>
                      <Table.Column className="bg-gray-50/70 text-gray-500 text-xs font-bold uppercase tracking-wider py-4">Offer Rate</Table.Column>
                      <Table.Column className="bg-gray-50/70 text-gray-500 text-xs font-bold uppercase tracking-wider py-4 text-right pr-6">Action</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {specialDays.map((day) => (
                        <Table.Row key={day.id} className="border-b border-gray-100 last:border-none hover:bg-gray-50/40 transition duration-150">
                          <Table.Cell className="font-mono text-xs text-gray-400 py-4 font-medium">{day.id}</Table.Cell>
                          <Table.Cell className="font-semibold text-gray-900 py-4 text-sm">{day.title}</Table.Cell>
                          <Table.Cell className="text-gray-500 text-sm py-4">{formatDate(day.date)}</Table.Cell>
                          <Table.Cell className="py-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                              <IoIosArrowRoundDown className="text-base text-emerald-600" />
                              {day.discount}% Off
                            </span>
                          </Table.Cell>
                          <Table.Cell className="py-4 text-right pr-6">
                            <button 
                              onClick={() => handleDelete(day.id)} 
                              className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-700 bg-transparent hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-semibold transition duration-150 cursor-pointer"
                            >
                              <RiDeleteBin6Line className="text-sm" />
                              Delete
                            </button>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ManageSpecialDay;