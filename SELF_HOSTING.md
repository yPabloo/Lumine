# Festival Lumine de Artes — execução própria

Este pacote é a versão independente da demonstração. Ele usa Next.js, SQLite,
Docker Compose e Nginx. Não depende do ChatGPT Sites nem do Cloudflare D1.

## Requisitos

- Git
- Docker Engine com Docker Compose
- VS Code, opcional

## Executar com Docker

1. Copie `.env.docker.example` para `.env`.
2. Troque `ADMIN_PASSWORD` por uma senha longa e exclusiva.
3. Ajuste `ADMIN_EMAIL` para o e-mail do administrador.
4. Execute:

   ```bash
   docker compose up -d --build
   ```

5. Acesse `http://localhost:8080`.
6. A área administrativa fica em `/admin` e solicitará o usuário e a senha do
   arquivo `.env`.

O banco SQLite fica no volume Docker `lumine_data`. Recriar o contêiner não
apaga as inscrições. Faça backup periódico desse volume antes de atualizações.

## Criar o repositório Git

```bash
git init
git add .
git commit -m "Site Festival Lumine de Artes"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

O arquivo `.env` está ignorado e não deve ser enviado ao GitHub.

## Hospedagem

Em um servidor Linux com Docker, clone o repositório, crie o `.env` e execute o
mesmo comando do Docker Compose. Para uso público, coloque HTTPS e o domínio na
frente do serviço. Cloudflare Proxy, Caddy, Traefik ou o proxy do seu provedor
podem cuidar do certificado TLS.

Antes de abrir inscrições, confirme data, horário, faixa etária, capacidade,
taxa e regras do evento, e revise a minuta jurídica da página de termos.

## Comandos úteis

```bash
docker compose logs -f
docker compose restart
docker compose pull
docker compose down
```

Não use `docker compose down -v` em produção: a opção `-v` remove o volume do
banco e pode apagar as inscrições.
