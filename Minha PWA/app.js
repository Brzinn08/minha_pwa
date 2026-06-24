// Verifica se o navegador suporta Service Workers
if ('serviceWorker' in navigator) {

  // Espera a página carregar completamente antes de registrar
  window.addEventListener('load', () => {

    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('✅ Service Worker registrado com sucesso!', registration);
      })
      .catch(error => {
        console.log('❌ Falha no registro do Service Worker:', error);
      });

  });
}