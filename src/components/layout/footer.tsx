export default function Footer() {
  return (
    <footer className="bg-background py-8 px-4">
        <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 Todos los derechos reservados.</p>
            <div className="mt-4 flex justify-center gap-4">
                <a href="#" className="hover:text-primary transition-colors">Términos de Servicio</a>
                <a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a>
            </div>
        </div>
    </footer>
  );
}
