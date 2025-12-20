import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Filter, Eye, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ResponsiveTable, {
  MobileCard,
  MobileCardRow,
} from "../components/common/ResponsiveTable";
import { useTheme } from "../contexts/ThemeContext";

const Clients = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - replace with API call
  const clients = [
    {
      id: 1,
      dateContracted: "2024-11-15",
      clientName: "ABC Corporation",
      contactPerson: "John Doe",
      contactNumber: "+63 912 345 6789",
      email: "john@abc.com",
      serviceType: "Garbage Collection",
      location: "Makati City",
      estimatedVolume: "500 kg/week",
      currentVolume: "480 kg/week",
      rate: "₱15,000/month",
      salesRep: "Maria Santos",
      status: "active",
      notes: "Weekly pickup every Monday and Thursday",
    },
    {
      id: 2,
      dateContracted: "2024-10-20",
      clientName: "Green Plaza Condominiums",
      contactPerson: "Sarah Lee",
      contactNumber: "+63 945 678 9012",
      email: "sarah@greenplaza.com",
      serviceType: "Garbage Collection",
      location: "Quezon City",
      estimatedVolume: "1000 kg/week",
      currentVolume: "950 kg/week",
      rate: "₱28,000/month",
      salesRep: "Juan Cruz",
      status: "active",
      notes: "Residential building - 200 units",
    },
    {
      id: 3,
      dateContracted: "2024-09-10",
      clientName: "XYZ Industries",
      contactPerson: "Jane Smith",
      contactNumber: "+63 923 456 7890",
      email: "jane@xyz.com",
      serviceType: "Septic Siphoning",
      location: "Pasig City",
      estimatedVolume: "Monthly service",
      currentVolume: "Monthly service",
      rate: "₱8,000/service",
      salesRep: "Juan Cruz",
      status: "active",
      notes: "Monthly maintenance contract",
    },
    {
      id: 4,
      dateContracted: "2024-08-05",
      clientName: "Tech Solutions Inc",
      contactPerson: "Mike Johnson",
      contactNumber: "+63 934 567 8901",
      email: "mike@techsol.com",
      serviceType: "Hazardous Waste",
      location: "BGC, Taguig",
      estimatedVolume: "200 kg/month",
      currentVolume: "180 kg/month",
      rate: "₱25,000/month",
      salesRep: "Maria Santos",
      status: "active",
      notes: "Laboratory chemical waste disposal",
    },
    {
      id: 5,
      dateContracted: "2024-07-12",
      clientName: "Sunshine Mall",
      contactPerson: "Patricia Cruz",
      contactNumber: "+63 967 890 1234",
      email: "patricia@sunshinemall.com",
      serviceType: "Garbage Collection",
      location: "Manila",
      estimatedVolume: "1500 kg/week",
      currentVolume: "1400 kg/week",
      rate: "₱45,000/month",
      salesRep: "Maria Santos",
      status: "active",
      notes: "Daily collection required",
    },
  ];

  const getStatusBadge = (status) => {
    const variantsDark = {
      active: {
        label: "Active",
        className:
          "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30",
      },
      inactive: {
        label: "Inactive",
        className:
          "bg-slate-500/20 text-slate-400 border border-slate-500/30 hover:bg-slate-500/30",
      },
      suspended: {
        label: "Suspended",
        className:
          "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30",
      },
    };

    const variantsLight = {
      active: {
        label: "Active",
        className:
          "bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-100",
      },
      inactive: {
        label: "Inactive",
        className:
          "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-100",
      },
      suspended: {
        label: "Suspended",
        className:
          "bg-red-100 text-red-700 border border-red-200 hover:bg-red-100",
      },
    };

    const variants = theme === "dark" ? variantsDark : variantsLight;
    const variant = variants[status] || variants.active;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const filteredClients = clients.filter(
    (client) =>
      client.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
        <Card
          className={
            theme === "dark"
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-emerald-200 bg-emerald-50"
          }
        >
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <p
                className={`text-xs sm:text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-emerald-400" : "text-emerald-700"
                }`}
              >
                Total Active Clients
              </p>
              <p
                className={`text-2xl sm:text-3xl font-bold ${
                  theme === "dark" ? "text-emerald-300" : "text-emerald-900"
                }`}
              >
                {clients.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card
          className={
            theme === "dark"
              ? "border-blue-500/30 bg-blue-500/10"
              : "border-blue-200 bg-blue-50"
          }
        >
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <p
                className={`text-xs sm:text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-blue-400" : "text-blue-700"
                }`}
              >
                Monthly Revenue
              </p>
              <p
                className={`text-2xl sm:text-3xl font-bold ${
                  theme === "dark" ? "text-blue-300" : "text-blue-900"
                }`}
              >
                ₱121,000
              </p>
            </div>
          </CardContent>
        </Card>
        <Card
          className={
            theme === "dark"
              ? "border-violet-500/30 bg-violet-500/10"
              : "border-violet-200 bg-violet-50"
          }
        >
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <p
                className={`text-xs sm:text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-violet-400" : "text-violet-700"
                }`}
              >
                New This Month
              </p>
              <p
                className={`text-2xl sm:text-3xl font-bold ${
                  theme === "dark" ? "text-violet-300" : "text-violet-900"
                }`}
              >
                3
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
              theme === "dark" ? "text-white/40" : "text-slate-400"
            }`}
          />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 h-11 ${
              theme === "dark"
                ? "border-white/10 bg-white/5 text-white placeholder:text-white/40"
                : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400"
            }`}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className={`gap-2 flex-1 sm:flex-initial ${
              theme === "dark"
                ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                : "border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="sm:inline">Filter</span>
          </Button>
          <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 flex-1 sm:flex-initial text-white">
            <Plus className="w-4 h-4" />
            <span className="sm:inline">Add Client</span>
          </Button>
        </div>
      </div>

      {/* Clients Table */}
      <Card
        className={
          theme === "dark"
            ? "border-white/10 bg-black/40 backdrop-blur-xl"
            : "border-slate-200 bg-white"
        }
      >
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span
              className={`text-base sm:text-lg ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              Contracted Clients ({filteredClients.length})
            </span>
            <span
              className={`text-xs sm:text-sm font-normal ${
                theme === "dark" ? "text-white/60" : "text-slate-600"
              }`}
            >
              Showing {filteredClients.length} of {clients.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <ResponsiveTable
            mobileCards={filteredClients.map((client) => (
              <MobileCard key={client.id}>
                <div className="space-y-3">
                  <div
                    className={`flex items-start justify-between gap-3 pb-3 border-b ${
                      theme === "dark" ? "border-white/10" : "border-slate-200"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-semibold truncate mb-1 ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {client.clientName}
                      </h3>
                      <p
                        className={`text-xs ${
                          theme === "dark" ? "text-white/50" : "text-slate-500"
                        }`}
                      >
                        Since{" "}
                        {new Date(client.dateContracted).toLocaleDateString()}
                      </p>
                    </div>
                    {getStatusBadge(client.status)}
                  </div>

                  <div className="space-y-2 text-sm">
                    <MobileCardRow
                      label="Contact"
                      value={client.contactPerson}
                    />
                    <MobileCardRow label="Email" value={client.email} />
                    <MobileCardRow label="Phone" value={client.contactNumber} />
                    <MobileCardRow
                      label="Service"
                      value={
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${
                            theme === "dark"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {client.serviceType}
                        </span>
                      }
                    />
                    <MobileCardRow label="Location" value={client.location} />
                    <MobileCardRow
                      label="Est. Volume"
                      value={client.estimatedVolume}
                    />
                    <MobileCardRow
                      label="Current"
                      value={client.currentVolume}
                    />
                    <MobileCardRow
                      label="Rate"
                      value={
                        <span
                          className={`font-semibold ${
                            theme === "dark"
                              ? "text-emerald-400"
                              : "text-emerald-700"
                          }`}
                        >
                          {client.rate}
                        </span>
                      }
                    />
                    <MobileCardRow label="Sales Rep" value={client.salesRep} />
                  </div>

                  <div
                    className={`flex gap-2 pt-2 border-t ${
                      theme === "dark" ? "border-white/10" : "border-slate-200"
                    }`}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className={`flex-1 text-xs ${
                        theme === "dark"
                          ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                          : "border-slate-300 text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </MobileCard>
            ))}
          >
            <Table>
              <TableHeader>
                <TableRow
                  className={
                    theme === "dark"
                      ? "border-white/10 hover:bg-white/5"
                      : "border-slate-200"
                  }
                >
                  <TableHead
                    className={
                      theme === "dark" ? "text-white/70" : "text-slate-600"
                    }
                  >
                    Client Name
                  </TableHead>
                  <TableHead
                    className={
                      theme === "dark" ? "text-white/70" : "text-slate-600"
                    }
                  >
                    Contact
                  </TableHead>
                  <TableHead
                    className={
                      theme === "dark" ? "text-white/70" : "text-slate-600"
                    }
                  >
                    Email
                  </TableHead>
                  <TableHead
                    className={
                      theme === "dark" ? "text-white/70" : "text-slate-600"
                    }
                  >
                    Service
                  </TableHead>
                  <TableHead
                    className={`hidden 2xl:table-cell ${
                      theme === "dark" ? "text-white/70" : "text-slate-600"
                    }`}
                  >
                    Location
                  </TableHead>
                  <TableHead
                    className={`hidden 2xl:table-cell ${
                      theme === "dark" ? "text-white/70" : "text-slate-600"
                    }`}
                  >
                    Volume
                  </TableHead>
                  <TableHead
                    className={
                      theme === "dark" ? "text-white/70" : "text-slate-600"
                    }
                  >
                    Rate
                  </TableHead>
                  <TableHead
                    className={`hidden 2xl:table-cell ${
                      theme === "dark" ? "text-white/70" : "text-slate-600"
                    }`}
                  >
                    Sales Rep
                  </TableHead>
                  <TableHead
                    className={
                      theme === "dark" ? "text-white/70" : "text-slate-600"
                    }
                  >
                    Status
                  </TableHead>
                  <TableHead
                    className={`text-right ${
                      theme === "dark" ? "text-white/70" : "text-slate-600"
                    }`}
                  >
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow
                    key={client.id}
                    className={
                      theme === "dark"
                        ? "border-white/10 hover:bg-white/5"
                        : "border-slate-100 hover:bg-slate-50"
                    }
                  >
                    <TableCell>
                      <div className="max-w-[150px]">
                        <div
                          className={`font-medium truncate ${
                            theme === "dark" ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {client.clientName}
                        </div>
                        <div
                          className={`text-xs whitespace-nowrap ${
                            theme === "dark"
                              ? "text-white/50"
                              : "text-slate-500"
                          }`}
                        >
                          Since{" "}
                          {new Date(client.dateContracted).toLocaleDateString(
                            "en-US",
                            { month: "short", year: "numeric" }
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[120px] truncate">
                      <div
                        className={`font-medium truncate ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {client.contactPerson}
                      </div>
                    </TableCell>
                    <TableCell
                      className={`max-w-[140px] truncate text-sm ${
                        theme === "dark" ? "text-white/70" : "text-slate-600"
                      }`}
                    >
                      {client.email}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                          theme === "dark"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {client.serviceType}
                      </span>
                    </TableCell>
                    <TableCell
                      className={`hidden 2xl:table-cell ${
                        theme === "dark" ? "text-white/70" : "text-slate-600"
                      }`}
                    >
                      {client.location}
                    </TableCell>
                    <TableCell
                      className={`hidden 2xl:table-cell ${
                        theme === "dark" ? "text-white/70" : "text-slate-600"
                      }`}
                    >
                      <div className="text-xs">
                        <div>Est: {client.estimatedVolume}</div>
                        <div
                          className={
                            theme === "dark"
                              ? "text-white/50"
                              : "text-slate-500"
                          }
                        >
                          Cur: {client.currentVolume}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell
                      className={`font-semibold whitespace-nowrap ${
                        theme === "dark"
                          ? "text-emerald-400"
                          : "text-emerald-700"
                      }`}
                    >
                      {client.rate}
                    </TableCell>
                    <TableCell
                      className={`hidden 2xl:table-cell ${
                        theme === "dark" ? "text-white/70" : "text-slate-600"
                      }`}
                    >
                      {client.salesRep}
                    </TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={
                              theme === "dark"
                                ? "text-white/60 hover:bg-white/5 hover:text-white"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className={
                            theme === "dark"
                              ? "border-white/10 bg-black/95 text-white"
                              : "border-slate-200 bg-white text-slate-900"
                          }
                        >
                          <DropdownMenuItem
                            className={
                              theme === "dark"
                                ? "hover:bg-white/10 focus:bg-white/10"
                                : "hover:bg-slate-100 focus:bg-slate-100"
                            }
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ResponsiveTable>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;
