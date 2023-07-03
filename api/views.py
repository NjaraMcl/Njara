from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import TeacherSerializer

from main.models import Teacher


@api_view(["GET"])
def TeacherList(request):
    teachers = Teacher.objects.all().order_by("-nom")
    serializer = TeacherSerializer(teachers, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def TeacherDetail(request, pk):
    teachers = Teacher.objects.get(id=pk)
    serializer = TeacherSerializer(teachers, many=False)
    return Response(serializer.data)


@api_view(["POST"])
def TeacherCreate(request):
    serializer = TeacherSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(["POST"])
def TeacherUpdate(request, pk):
    teacher = Teacher.objects.get(id=pk)
    serializer = TeacherSerializer(instance=teacher, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def TeacherDelete(request, pk):
    teacher = Teacher.objects.get(id=pk)
    teacher.delete()

    return Response("Teacher succsesfully delete!")
