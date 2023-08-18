FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine3.18 as publisher
WORKDIR /builder
COPY . .
RUN dotnet publish --output ./publish
FROM mcr.microsoft.com/dotnet/aspnet:7.0-alpine3.18
WORKDIR /app
COPY --from=publisher /builder/publish .
EXPOSE 7127
EXPOSE 80
ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "InternalAPI.dll"]