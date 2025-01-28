// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import esLocale from "@fullcalendar/core/locales/es";
// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     TextField,
//     Button,
//     MenuItem,
//     Box,
//     Typography,
//     DialogActions,
// } from "@mui/material";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { showSuccess } from "../components/sweetalert";

// interface Event {
//     id: number;
//     titulo: string;
//     descripcion: string;
//     fecha: string; // YYYY-MM-DD
//     hora: string; // HH:mm
//     tipo_evento: string;
// }

// interface EventType {
//     value: string;
//     tipo_evento: string;
//     color: string;
// }

// const CalendarPage: React.FC = () => {
//     const [events, setEvents] = useState<Event[]>([]);
//     const [eventTypes, setEventTypes] = useState<EventType[]>([]);
//     const [showAddForm, setShowAddForm] = useState(false);
//     const [showEventDetails, setShowEventDetails] = useState<Event | null>(null);
//     const [newEvent, setNewEvent] = useState<Event>({
//         id: 0,
//         titulo: "",
//         descripcion: "",
//         fecha: "",
//         hora: "",
//         tipo_evento: "",
//     });
//     const [isLoading, setIsLoading] = useState(false);
//     const fetchEventTypes = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/calendario/tipo_eventos`);
//             setEventTypes(response.data.data);
//         } catch (error) {
//             console.error("Error fetching event types:", error);
//         }
//     };

//     const fetchEvents = async () => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/calendario/get_data`);
//             // console.log(response.data.data)
//             setEvents(response.data.data);
//         } catch (error) {
//             console.error("Error fetching events:", error);
//         }
//     };

//     const handleAddEvent = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             setIsLoading(true);
//             const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/calendario/create`, newEvent);
//             if (response.status === 200 || response.status === 201) {
//                 fetchEvents(); // Refresh events
//                 setShowAddForm(false);
//                 colorizeDays();
//                 setNewEvent({ id: 0, titulo: "", descripcion: "", fecha: "", hora: "", tipo_evento: "" });
//                 showSuccess('Evento creado exitosamente');
//             }
//         } catch (error) {
//             console.error("Error adding event:", error);
//         }
//         setIsLoading(false);
//     };

//     const handleDeleteEvent = async (eventId: number) => {
//         try {
//             const result = await Swal.fire({
//                 title: "¿Estás seguro?",
//                 text: "Esta acción eliminará el evento de forma permanente.",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonColor: "#d33",
//                 cancelButtonColor: "#3085d6",
//                 confirmButtonText: "Sí, eliminar",
//                 cancelButtonText: "Cancelar",
//             });

//             if (result.isConfirmed) {
//                 setIsLoading(true);
//                 const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/calendario/delete`, { id: eventId });

//                 if (response?.data?.status === 200) {
//                     setShowEventDetails(null)
//                     setEvents(events.filter((event) => event.id !== eventId));
//                     showSuccess('Eliminado exitosamente.');
//                 }
//             }
//         } catch (error) {
//             console.error("Error deleting event:", error);
//         }
//         setIsLoading(false);
//     };

//     useEffect(() => {
//         fetchEventTypes();
//         fetchEvents();
//     }, []);

//     const convertDate = (date: string): string => {
//         const [day, month, year] = date.split("/");
//         return `${year}-${month}-${day}`;
//     };

//     const getColorForEvent = (tipo_evento: string) => {
//         const type = eventTypes.find((type) => type.tipo_evento === tipo_evento);
//         return type?.color || "#E0E0E0";
//     };

//     const formattedEvents = events.map((event) => {
//         return {
//             id: event.id.toString(),
//             title: event.titulo,
//             start: `${convertDate(event.fecha)}T${event.hora}`,
//             backgroundColor: getColorForEvent(event.tipo_evento),
//             borderColor: getColorForEvent(event.tipo_evento),
//             extendedProps: { tipo_evento: event.tipo_evento },
//         };
//     });
//     // Colorear las celdas del calendario después de que FullCalendar haya renderizado
//     useEffect(() => {
//         colorizeDays();
//     }, [events]);

//     const colorizeDays = () => {
//         const tableCells = document.querySelectorAll<HTMLElement>("[data-date]");
//         tableCells.forEach((cell) => {
//             const date = cell.getAttribute("data-date");
//             const event = events.find((e) => e.fecha === date);

//             if (event) {
//                 // Colorea la celda si hay un evento
//                 console.log(getColorForEvent(event.tipo_evento));
//                 cell.style.backgroundColor = getColorForEvent(event.tipo_evento) || "#E0E0E0";
//                 cell.style.borderRadius = "4px"; // Redondear esquinas
//             } else {
//                 // Limpia la celda si no hay eventos
//                 cell.style.backgroundColor = "";
//                 cell.style.borderRadius = "";
//             }
//         });
//     };

//     return (
//         <Box sx={{ minHeight: "90vh", bgcolor: "grey.100", p: 1 }}>
//             <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", mb: "1.5rem" }}>
//                 Calendario de Eventos Familia Oropeza
//             </Typography>

//             <Box display="flex" justifyContent="flex-start" mb={3}>
//                 <Button variant="contained" color="success" onClick={() => setShowAddForm(true)}>
//                     Agregar Evento
//                 </Button>
//             </Box>

//             <Box sx={{ bgcolor: "white", p: 1, borderRadius: 2, boxShadow: 2 }}>
//                 <FullCalendar
//                     plugins={[dayGridPlugin, interactionPlugin]}
//                     initialView="dayGridMonth"
//                     locale={esLocale}
//                     events={formattedEvents}
//                     eventClick={(info) => {
//                         const clickedEvent = events.find((event) => event.id.toString() === info.event.id);
//                         if (clickedEvent) setShowEventDetails(clickedEvent);
//                     }}
//                     headerToolbar={{ start: "prev,next", center: "title", end: "today" }}
//                     datesSet={() => colorizeDays()}
//                     eventContent={(info) => {
//                         // Personaliza el contenido del evento
//                         return (
//                             <div
//                                 style={{
//                                     textAlign: "center",
//                                     fontSize: "0.9rem",
//                                     fontWeight: "bold",
//                                     color: "#212121",
//                                     whiteSpace: "nowrap",
//                                     overflow: "hidden",
//                                     textOverflow: "ellipsis",
//                                 }}
//                             >
//                                 {info.event.title} {/* Solo muestra el título */}
//                             </div>
//                         );
//                     }}
//                 />
//             </Box>

//             <Dialog open={showAddForm} onClose={() => setShowAddForm(false)}>
//                 <DialogTitle>Agregar Evento</DialogTitle>
//                 <DialogContent>
//                     <Box component="form" onSubmit={handleAddEvent} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
//                         <TextField
//                             label="Título"
//                             variant="outlined"
//                             fullWidth
//                             required
//                             value={newEvent.titulo}
//                             onChange={(e) => setNewEvent({ ...newEvent, titulo: e.target.value })}
//                         />
//                         <TextField
//                             label="Descripción"
//                             variant="outlined"
//                             fullWidth
//                             multiline
//                             rows={3}
//                             required
//                             value={newEvent.descripcion}
//                             onChange={(e) => setNewEvent({ ...newEvent, descripcion: e.target.value })}
//                         />
//                         <TextField
//                             label="Fecha"
//                             type="date"
//                             InputLabelProps={{ shrink: true }}
//                             fullWidth
//                             required
//                             value={newEvent.fecha}
//                             onChange={(e) => setNewEvent({ ...newEvent, fecha: e.target.value })}
//                         />
//                         <TextField
//                             label="Hora"
//                             type="time"
//                             InputLabelProps={{ shrink: true }}
//                             fullWidth
//                             required
//                             value={newEvent.hora}
//                             onChange={(e) => setNewEvent({ ...newEvent, hora: e.target.value })}
//                         />
//                         <TextField
//                             label="Tipo de Evento"
//                             select
//                             fullWidth
//                             required
//                             value={newEvent.tipo_evento}
//                             onChange={(e) => setNewEvent({ ...newEvent, tipo_evento: e.target.value })}
//                         >
//                             {eventTypes.map((type) => (
//                                 <MenuItem key={type.value} value={type.value}>
//                                     {type.tipo_evento}
//                                 </MenuItem>
//                             ))}
//                         </TextField>
//                         <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
//                             {isLoading ? 'Guardando...' : 'Guardar'}
//                         </Button>
//                     </Box>
//                 </DialogContent>
//             </Dialog>

//             {showEventDetails && (
//                 <Dialog open={!!showEventDetails} onClose={() => setShowEventDetails(null)}>
//                     <DialogTitle>Detalles del Evento</DialogTitle>
//                     <DialogContent>
//                         <Typography><strong>Título:</strong> {showEventDetails.titulo}</Typography>
//                         <Typography><strong>Descripción:</strong> {showEventDetails.descripcion}</Typography>
//                         <Typography><strong>Fecha:</strong> {showEventDetails.fecha}</Typography>
//                         <Typography><strong>Hora:</strong> {showEventDetails.hora}</Typography>
//                         <Typography><strong>Tipo:</strong> {showEventDetails.tipo_evento}</Typography>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button
//                             disabled={isLoading}
//                             variant="contained"
//                             color="error"
//                             onClick={() => handleDeleteEvent(showEventDetails.id)}
//                         >
//                             {isLoading ? 'Eliminando...' : 'Eliminar'}
//                         </Button>
//                         <Button
//                             variant="outlined"
//                             onClick={() => setShowEventDetails(null)}
//                         >
//                             Cerrar
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//             )}
//         </Box>
//     );
// };

// export default CalendarPage;


import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    MenuItem,
    Box,
    Typography,
    DialogActions,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { showSuccess } from "../components/sweetalert";

interface Event {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string; // YYYY-MM-DD
    hora: string; // HH:mm
    tipo_evento: string;
}

interface EventType {
    value: string;
    tipo_evento: string;
    color: string;
}

const CalendarPage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [eventTypes, setEventTypes] = useState<EventType[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEventDetails, setShowEventDetails] = useState<Event | null>(null);
    const [newEvent, setNewEvent] = useState<Event>({
        id: 0,
        titulo: "",
        descripcion: "",
        fecha: "",
        hora: "",
        tipo_evento: "",
    });
    const [originalEvent, setOriginalEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const fetchEventTypes = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/calendario/tipo_eventos`);
            setEventTypes(response.data.data);
        } catch (error) {
            console.error("Error fetching event types:", error);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/calendario/get_data`);
            setEvents(response.data.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleAddOrUpdateEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const endpoint = isEditing
                ? `${import.meta.env.VITE_BACKEND_URL}/api/calendario/update`
                : `${import.meta.env.VITE_BACKEND_URL}/api/calendario/create`;
            const response = await axios.post(endpoint, newEvent);
            if (response.status === 200 || response.status === 201) {
                fetchEvents(); // Refresh events
                setShowAddForm(false);
                colorizeDays();
                setNewEvent({ id: 0, titulo: "", descripcion: "", fecha: "", hora: "", tipo_evento: "" });
                showSuccess(isEditing ? "Evento actualizado exitosamente" : "Evento creado exitosamente");
            }
        } catch (error) {
            console.error("Error saving event:", error);
        }
        setIsLoading(false);
    };

    const handleDeleteEvent = async (eventId: number) => {
        try {
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción eliminará el evento de forma permanente.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            });

            if (result.isConfirmed) {
                setIsLoading(true);
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/calendario/delete`, { id: eventId });

                if (response?.data?.status === 200) {
                    setShowEventDetails(null);
                    setEvents(events.filter((event) => event.id !== eventId));
                    showSuccess("Eliminado exitosamente.");
                }
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchEventTypes();
        fetchEvents();
    }, []);

    const convertDate = (date: string): string => {
        const [day, month, year] = date.split("/");
        return `${year}-${month}-${day}`;
    };

    const getColorForEvent = (tipo_evento: string) => {
        const type = eventTypes.find((type) => type.tipo_evento === tipo_evento);
        return type?.color || "#E0E0E0";
    };

    const formattedEvents = events.map((event) => {
        return {
            id: event.id.toString(),
            title: event.titulo,
            start: `${convertDate(event.fecha)}T${event.hora}`,
            backgroundColor: getColorForEvent(event.tipo_evento),
            borderColor: getColorForEvent(event.tipo_evento),
            extendedProps: { tipo_evento: event.tipo_evento },
        };
    });

    useEffect(() => {
        colorizeDays();
    }, [events]);

    const colorizeDays = () => {
        const tableCells = document.querySelectorAll<HTMLElement>("[data-date]");
        tableCells.forEach((cell) => {
            const date = cell.getAttribute("data-date");
            const event = events.find((e) => convertDate(e.fecha) === date);

            if (event) {
                cell.style.backgroundColor = getColorForEvent(event.tipo_evento) || "#E0E0E0";
                cell.style.borderRadius = "4px";
            } else {
                cell.style.backgroundColor = "";
                cell.style.borderRadius = "";
            }
        });
    };

    const openEditModal = (event: Event) => {
        const formattedDate = convertDate(event.fecha); // Convertimos la fecha
        const eventType = eventTypes.find((type) => type.tipo_evento === event.tipo_evento)?.value || ""; // Obtenemos el value correspondiente
        setOriginalEvent({ ...event, fecha: formattedDate, tipo_evento: eventType }); // Guardamos el estado original
        setNewEvent({ ...event, fecha: formattedDate, tipo_evento: eventType }); // Actualizamos el estado
        setShowEventDetails(null);
        setIsEditing(true);
        setShowAddForm(true);
    };
    const hasChanges = (): boolean => {
        if (!originalEvent) return true; // Si no hay un estado original (modal de creación), permitir guardar
        return JSON.stringify(originalEvent) !== JSON.stringify(newEvent);
    };
    

    return (
        <Box sx={{ minHeight: "90vh", bgcolor: "grey.100", p: 1 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", mb: "1.5rem" }}>
                Calendario de Eventos Familia Oropeza
            </Typography>

            <Box display="flex" justifyContent="flex-start" mb={3}>
                <Button variant="contained" color="success" onClick={() => {
                    setNewEvent({ id: 0, titulo: "", descripcion: "", fecha: "", hora: "", tipo_evento: "" });
                    setIsEditing(false);
                    setShowAddForm(true);
                }}>
                    Agregar Evento
                </Button>
            </Box>

            <Box sx={{ bgcolor: "white", p: 1, borderRadius: 2, boxShadow: 2 }}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale={esLocale}
                    events={formattedEvents}
                    eventClick={(info) => {
                        const clickedEvent = events.find((event) => event.id.toString() === info.event.id);
                        if (clickedEvent) setShowEventDetails(clickedEvent);
                    }}
                    headerToolbar={{ start: "prev,next", center: "title", end: "today" }}
                    datesSet={() => colorizeDays()}
                    eventContent={(info) => {
                        return (
                            <div
                                style={{
                                    textAlign: "center",
                                    fontSize: "0.9rem",
                                    fontWeight: "bold",
                                    color: "#212121",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {info.event.title}
                            </div>
                        );
                    }}
                />
            </Box>

            <Dialog open={showAddForm} onClose={() => setShowAddForm(false)}>
                <DialogTitle>{isEditing ? "Editar Registro" : "Agregar Registro"}</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleAddOrUpdateEvent} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                        <TextField
                            label="Título"
                            variant="outlined"
                            fullWidth
                            required
                            value={newEvent.titulo}
                            onChange={(e) => setNewEvent({ ...newEvent, titulo: e.target.value })}
                        />
                        <TextField
                            label="Descripción"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            required
                            value={newEvent.descripcion}
                            onChange={(e) => setNewEvent({ ...newEvent, descripcion: e.target.value })}
                        />
                        <TextField
                            label="Fecha"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            required
                            value={newEvent.fecha}
                            onChange={(e) => setNewEvent({ ...newEvent, fecha: e.target.value })}
                        />
                        <TextField
                            label="Hora"
                            type="time"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            required
                            value={newEvent.hora}
                            onChange={(e) => setNewEvent({ ...newEvent, hora: e.target.value })}
                        />
                        <TextField
                            label="Tipo de Evento"
                            select
                            fullWidth
                            required
                            value={newEvent.tipo_evento}
                            onChange={(e) => setNewEvent({ ...newEvent, tipo_evento: e.target.value })}
                        >
                            {eventTypes.map((type) => (
                                <MenuItem key={type.value} value={type.value}>
                                    {type.tipo_evento}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading || !hasChanges()}>
                            {isLoading ? (isEditing ? "Actualizando..." : "Guardando...") : (isEditing ? "Actualizar" : "Guardar")}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            {showEventDetails && (
                <Dialog open={!!showEventDetails} onClose={() => setShowEventDetails(null)} maxWidth="sm" fullWidth>
                    <DialogTitle>Detalles del Evento</DialogTitle>
                    <DialogContent>
                        <Typography><strong>Título:</strong> {showEventDetails.titulo}</Typography>
                        <Typography><strong>Descripción:</strong> {showEventDetails.descripcion}</Typography>
                        <Typography><strong>Fecha:</strong> {showEventDetails.fecha}</Typography>
                        <Typography><strong>Hora:</strong> {showEventDetails.hora}</Typography>
                        <Typography><strong>Tipo:</strong> {showEventDetails.tipo_evento}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            disabled={isLoading}
                            variant="contained"
                            color="primary"
                            onClick={() => openEditModal(showEventDetails)}
                        >
                            Editar
                        </Button>
                        <Button
                            disabled={isLoading}
                            variant="contained"
                            color="error"
                            onClick={() => handleDeleteEvent(showEventDetails.id)}
                        >
                            {isLoading ? "Eliminando..." : "Eliminar"}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setShowEventDetails(null)}
                        >
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default CalendarPage;
