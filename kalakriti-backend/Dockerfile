# Build stage
FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/kalakriti-backend-1.0.0.jar app.jar
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "app.jar"]
