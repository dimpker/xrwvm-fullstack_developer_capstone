from django.contrib import admin
from .models import CarMake, CarModel


# Register your models here.

# CarModelInline class for displaying CarModels inline with CarMake
class CarModelInline(admin.TabularInline):
    model = CarModel
    extra = 1

# CarModelAdmin class


class CarModelAdmin(admin.ModelAdmin):
    list_display = ['name', 'car_make', 'type', 'year', 'dealer_id']
    list_filter = ['car_make', 'type', 'year']
    search_fields = ['name', 'car_make__name']
    ordering = ['car_make', 'name']

# CarMakeAdmin class with CarModelInline


class CarMakeAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'country', 'founded_year']
    list_filter = ['country']
    search_fields = ['name', 'description']
    inlines = [CarModelInline]


# Register models here
admin.site.register(CarMake, CarMakeAdmin)
admin.site.register(CarModel, CarModelAdmin)
