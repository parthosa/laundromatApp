from django.shortcuts import render
from django.contrib.auth.models import User
from .models import *
from django.contrib.admin.views.decorators import staff_member_required
import uuid
from django.http import HttpResponseRedirect,Http404,HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

def Register(request):
	if request.POST:
		email = request.POST['email']
		gid = request.POST['gid']
		if email in User.objects.all().values('username'):
			user = authenticate(username = email, password = gid)
			if user:
				login(request, user)
				return JsonResponse({'status': 1, 'message': 'Successfully logged in'})
			else:
				return JsonResponse({'status': 0})
		else:
			User.objects.create(username = email, password = gid)
			user_p = UserProfile()
			user_p.bits_id = request.POST['bits_id']
			user_p.name = request.POST['name']
			hostel = Hostel.objects.get(short = request.POST['hostel'])
			user_p.hostel = hostel
			user_p.room = request.POST['room_num']
			user_p.apply_date = request.POST['appy_date']
			user_p.phone = request.POST['phone']
			user_p.uid = gid
			user_p.dp = request.FILES['dp']
			user = User.objects.get(username = email)
			user_p.save()
			hostel.user.add(user_p)
			hostel.save()
			user_l = authenticate(username = email, password = gid)
			login(request, user_l)

			return JsonResponse({'status':1, 'message': 'User saved Successfully'})

@csrf_exempt
def logout(request):
	logout(request)
	return JsonResponse({'status': 1, 'message': 'You have been successfully logged out'})


@csrf_exempt
@login_required
def Profile(request):
	if request.POST:
		user_p = UserProfile.objects.get(user = request.user)
		name = user_p.name
		bits_id = user_p.bits_id
		phone = user_p.phone
		hostel = user_p.hostel.short
		email = request.user.username
		plan_num = user_p.plan.plan_num
		with_iron = user_p.plan.with_iron
		apply_date = user_p.apply_date
		washes = user_p.plan.washes
		status = user_p.present_wash.status
		washes_left = user_p.plan.washes - len(user_p.wash_history)

		return JsonResponse({'status': 1, 'name': name, 'bits_id': bits_id, 'phone': phone, 'email': email, 'plan_num': plan_num, 'with_iron': with_iron, 'apply_date': apply_date, 'washes': washes, 'washes_left': washes_left, 'wash_status' :status, 'hostel': hostel})


@csrf_exempt
@staff_member_required
def scan_laundro(self):
	if request.POST:
		gid = request.POST['uid']
		user_p = UserProfile.objects.get(uid = gid)
		name = user_p.name
		bits_id = user_p.bits_id
		phone = user_p.phone
		email = request.user.username
		plan_num = user_p.plan.plan_num
		with_iron = user_p.plan.with_iron
		apply_date = user_p.apply_date
		washes = user_p.plan.washes
		status = user_p.present_wash.status
		washes_left = user_p.plan.washes - len(user_p.wash_history)

		return JsonResponse({'status': 1, 'name': name, 'bits_id': bits_id, 'phone': phone, 'email': email, 'plan_num': plan_num, 'with_iron': with_iron, 'apply_date': apply_date, 'washes': washes, 'washes_left': washes_left, 'status' :status})

@csrf_exempt
@staff_member_required
def change_status(self):
	if request.POST:
		bits_id = request.POST['bits_id']
		user_p = UserProfile.objects.get(bits_id = bits_id)
		status = Status.objects.get(name = request.POST['status'])
		if int(request.POST['status']) == 1:
			Wash.objects.create(user = user_p, status = status, date = request.POST['date'])
			wash = Wash.objects.get(user = user_p, date = request.POST['date'])
			user_p.wash_history.add(wash)
			user_p.present_wash = wash
			user_p.save()
		else:
			user_p.present_wash.status = status
			user_p.save()

		response = {'status': 1, 'message': 'Successfully updated status'}
		return JsonResponse(response)

@staff_member_required
@csrf_exempt
def get_students(self):
	if request.POST:
		hostel = Hostel.objects.get(short = request.POST['hostel'])
		students = hostel.user.all()
		response_list = []
		for student in students:
			response_list.append({'name': student.name, 'bits_id': student.bits_id, 'plan': student.plan.plan_num})

		return JsonResponse({'status': 1, 'students': response_list})

@staff_member_required
@csrf_exempt
def get_hostels(request):
	hostels = Hostel.objects.all()
	names = [x.short for x in hostels]

	return JsonResponse({'status': 1, 'hostels': hostels})


