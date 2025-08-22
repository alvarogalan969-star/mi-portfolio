import React from "react";
import { render, screen } from "@testing-library/react";
import Hero from "../Hero";

describe("Hero", () => {
    it("muestra el título con el nombre", () => {
        render(<Hero />);
        expect(screen.getByText(/Hola, soy/i)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /ver proyectos/i })).toHaveAttribute("href", "/proyectos");
        expect(screen.getByRole("link", { name: /contactar/i })).toHaveAttribute("href", "/contacto");
    });
});
