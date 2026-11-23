"""
Lanzador de Servidor Local para Bulldog Design Workflow App
Asigna dinamicamente un puerto libre y abre el navegador automaticamente.
"""

import sys
import os
import socket
import http.server
import socketserver
import webbrowser
import threading
import time

def get_unused_port():
    """
    Obtiene un puerto dinamico garantizado como libre por el sistema operativo
    en el rango alto (efimero), asegurando que nunca colisione con puertos usados
    previamente como 8080, 8000, 3000 o 5000.
    """
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        # Enlazamos a 0 para que Windows asigne un puerto libre nuevo
        s.bind(('127.0.0.1', 0))
        s.listen(1)
        port = s.getsockname()[1]
    return port

def run_server():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    app_dir = os.path.join(base_dir, "app")
    
    if not os.path.exists(app_dir):
        print(f"[ERROR] No se encontro el directorio 'app' en: {app_dir}")
        sys.exit(1)

    os.chdir(app_dir)
    
    port = get_unused_port()
    url = f"http://127.0.0.1:{port}"

    class CustomHandler(http.server.SimpleHTTPRequestHandler):
        def log_message(self, format, *args):
            # Log limpio para no saturar consola
            pass

    print("=" * 72)
    print("      BULLDOG DESIGN — APLICACION DE FLUJO DE TRABAJO")
    print("=" * 72)
    print(f"\n[+] Puerto libre asignado dinamicamente: {port}")
    print(f"[+] URL de la aplicacion:             {url}")
    print(f"[+] Directorio web:                    {app_dir}")
    print("\n[+] Abriendo tu navegador web predeterminado...")

    # Abrir navegador tras 600ms
    def open_browser():
        time.sleep(0.6)
        webbrowser.open(url)

    threading.Thread(target=open_browser, daemon=True).start()

    print("[✔] Servidor activo y funcionando.")
    print("    (Puedes minimizar esta ventana. Para cerrar el servidor, presiona Ctrl+C)\n")
    print("-" * 72)

    try:
        with socketserver.TCPServer(("127.0.0.1", port), CustomHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[!] Servidor detenido por el usuario.")
    except Exception as e:
        print(f"\n[!] Error en el servidor: {e}")

if __name__ == "__main__":
    run_server()
