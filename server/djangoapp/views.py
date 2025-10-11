from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import logout
from django.contrib import messages
from django.http import JsonResponse
from django.contrib.auth import login, authenticate
import logging
import json
from django.views.decorators.csrf import csrf_exempt
from .models import CarMake, CarModel
from .populate import initiate
from .restapis import get_request, analyze_review_sentiments, post_review


# Get an instance of a logger
logger = logging.getLogger(__name__)


# Create your views here.

# Create a `login_request` view to handle sign in request
@csrf_exempt
def login_user(request):
    if request.method != 'POST':
        return JsonResponse(
            {"status": "Failed", "error": "Method not allowed"}, status=405)

    try:
        # Get username and password from request.POST dictionary
        data = json.loads(request.body)
        username = data['userName']
        password = data['password']
        # Try to check if provide credential can be authenticated
        user = authenticate(username=username, password=password)
        if user is not None:
            # If user is valid, call login method to login current user
            login(request, user)
            data = {"userName": username, "status": "Authenticated"}
        else:
            # If user is not valid, return error message
            data = {
                "userName": username,
                "status": "Failed",
                "error": "Invalid credentials"}
        return JsonResponse(data)
    except Exception as e:
        return JsonResponse({"status": "Failed", "error": str(e)}, status=400)

# Create a `logout_request` view to handle sign out request


@csrf_exempt
def logout_request(request):
    logout(request)  # Terminate user session
    data = {"userName": ""}  # Return empty username
    return JsonResponse(data)

# Create a `registration` view to handle sign up request


@csrf_exempt
def registration(request):
    if request.method != 'POST':
        return JsonResponse(
            {"status": "Failed", "error": "Method not allowed"}, status=405)

    try:
        # Load JSON data from the request body
        data = json.loads(request.body)
        username = data['userName']
        password = data['password']
        first_name = data['firstName']
        last_name = data['lastName']
        email = data['email']
        username_exist = False
        try:
            # Check if user already exists
            User.objects.get(username=username)
            username_exist = True
        except BaseException:
            # If not, simply log this is a new user
            logger.debug("{} is new user".format(username))

        # If it is a new user
        if not username_exist:
            # Create user in auth_user table
            user = User.objects.create_user(
                username=username,
                first_name=first_name,
                last_name=last_name,
                password=password,
                email=email)
            # Login the user and redirect to list page
            login(request, user)
            data = {"userName": username, "status": "Authenticated"}
            return JsonResponse(data)
        else:
            data = {
                "userName": username,
                "status": "Failed",
                "error": "Already Registered"}
            return JsonResponse(data)
    except Exception as e:
        return JsonResponse({"status": "Failed", "error": str(e)}, status=400)

# Method to get the list of cars


def get_cars(request):
    count = CarMake.objects.filter().count()
    print(f"CarMake count: {count}")
    if (count == 0):
        print("Calling initiate() to populate data...")
        initiate()
        print("Initiate() completed")

    car_models = CarModel.objects.select_related('car_make')
    print(f"CarModel count: {car_models.count()}")

    cars = []
    for car_model in car_models:
        cars.append({"CarModel": car_model.name,
                     "CarMake": car_model.car_make.name})

    print(f"Returning {len(cars)} cars")
    return JsonResponse({"CarModels": cars})

# Update the `get_dealerships` render list of dealerships all by default,
# particular state if state is passed


def get_dealerships(request, state="All"):
    if (state == "All"):
        endpoint = "/fetchDealers"
    else:
        endpoint = "/fetchDealers/" + state
    dealerships = get_request(endpoint)
    return JsonResponse({"status": 200, "dealers": dealerships})


def get_dealer_reviews(request, dealer_id):
    # if dealer id has been provided
    if (dealer_id):
        endpoint = "/fetchReviews/dealer/" + str(dealer_id)
        reviews = get_request(endpoint)
        for review_detail in reviews:
            response = analyze_review_sentiments(review_detail['review'])
            print(response)
            review_detail['sentiment'] = response['sentiment']
        return JsonResponse({"status": 200, "reviews": reviews})
    else:
        return JsonResponse({"status": 400, "message": "Bad Request"})


def get_dealer_details(request, dealer_id):
    if (dealer_id):
        endpoint = "/fetchDealer/" + str(dealer_id)
        dealership = get_request(endpoint)
        return JsonResponse({"status": 200, "dealer": dealership})
    else:
        return JsonResponse({"status": 400, "message": "Bad Request"})


@csrf_exempt
@csrf_exempt
def add_review(request):
    """
    Add a review for a dealer - only authenticated users can post reviews
    """
    print(f"User authenticated: {request.user.is_authenticated}")
    print(f"User: {request.user}")
    print(f"User is anonymous: {request.user.is_anonymous}")

    if not request.user.is_anonymous:
        data = json.loads(request.body)
        try:
            response = post_review(data)
            print(f"Review posted successfully: {response}")
            return JsonResponse(
                {"status": 200, "message": "Review added successfully"})
        except Exception as e:
            print(f"Error posting review: {str(e)}")
            return JsonResponse({
                "status": 401,
                "message": f"Error in posting review: {str(e)}"
            })
    else:
        return JsonResponse({"status": 403, "message": "Unauthorized"})


def dealers_table_view(request):
    """
    Render dealers in a table format
    """
    try:
        # Get all dealers from the backend API
        endpoint = "/fetchDealers"
        dealers = get_request(endpoint)

        context = {
            'dealers': dealers,
            'title': 'Dealership Directory',
            'user': request.user
        }
        return render(request, 'dealers_table.html', context)
    except Exception as e:
        context = {
            'error': f"Error loading dealers: {str(e)}",
            'dealers': [],
            'title': 'Dealership Directory',
            'user': request.user
        }
        return render(request, 'dealers_table.html', context)


def add_review_form_view(request):
    """
    Display add review form
    """
    if not request.user.is_authenticated:
        return redirect('/login/')

    dealer_id = request.GET.get('dealer_id')
    dealer_name = request.GET.get('dealer_name', 'Unknown Dealer')

    if request.method == 'POST':
        # Handle form submission
        try:
            review_data = {
                'dealership': int(dealer_id),
                'name': f"{
                    request.user.first_name} {
                    request.user.last_name}".strip() or request.user.username,
                'review': request.POST.get('review'),
                'purchase': request.POST.get('purchase') == 'on',
                'purchase_date': request.POST.get('purchase_date'),
                'car_make': request.POST.get('car_make'),
                'car_model': request.POST.get('car_model'),
                'car_year': request.POST.get('car_year')}

            post_review(review_data)
            messages.success(request, 'Review submitted successfully!')
            return redirect('/dealers/')

        except Exception as e:
            messages.error(request, f'Error submitting review: {str(e)}')

    context = {
        'dealer_id': dealer_id,
        'dealer_name': dealer_name,
        'title': f'Add Review for {dealer_name}',
        'user': request.user
    }
    return render(request, 'add_review_form.html', context)
