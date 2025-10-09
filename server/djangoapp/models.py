from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.

# Car Make model
class CarMake(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    # Additional fields for car make
    country = models.CharField(max_length=50, blank=True)  # Country of origin
    founded_year = models.IntegerField(
        null=True, blank=True)  # Year the company was founded

    def __str__(self):
        return self.name  # Return the name as the string representation

# Car Model model


class CarModel(models.Model):
    car_make = models.ForeignKey(
        CarMake, on_delete=models.CASCADE)  # Many-to-One relationship
    # Refers to a dealer created in Cloudant database
    dealer_id = models.IntegerField()
    name = models.CharField(max_length=100)

    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('WAGON', 'Wagon'),
        ('COUPE', 'Coupe'),
        ('CONVERTIBLE', 'Convertible'),
        ('HATCHBACK', 'Hatchback'),
        ('TRUCK', 'Truck'),
    ]
    type = models.CharField(max_length=15, choices=CAR_TYPES, default='SUV')
    year = models.IntegerField(default=2023,
                               validators=[
                                   MaxValueValidator(2023),
                                   MinValueValidator(2015)
                               ])

    # Additional fields for car model
    # Engine size (e.g., "2.0L", "V6")
    engine_size = models.CharField(max_length=20, blank=True)
    fuel_type = models.CharField(
        max_length=20,
        default='Gasoline')  # Fuel type
    transmission = models.CharField(
        max_length=20, default='Automatic')  # Transmission type

    def __str__(self):
        # Return the car make and model name
        return f"{self.car_make.name} {self.name}"
