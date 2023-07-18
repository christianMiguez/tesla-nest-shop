<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Tesla Nest Shop

1. Clone repo
2. `yarn install`
3. Use .env.example to create .env file
4. Start DB

```
docker-compose up -d
```

5. `yarn start:dev`

6. Execute seed (disable Auth() from seed.controller.ts)

```
http://localhost:3000/api/seed
```

7. Enable Auth() from seed.controller.ts
