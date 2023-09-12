provider "aws" {
  region = "us-east-1" 
}

resource "aws_security_group" "bastion_sg" {
  name_prefix = "bastion-sg-"

  vpc_id = var.vpc

}

resource "aws_iam_role" "bastion_role" {
  name = "bastion-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

resource "aws_instance" "bastion_instance" {
  ami           = "ami-053b0d53c279acc90"
  instance_type = "t3.nano"
  subnet_id     = var.subnetid
  key_name      = var.keyname
  availability_zone = "us-east-1a"

  iam_instance_profile = aws_iam_instance_profile.bastion_profile.name
}

resource "aws_iam_instance_profile" "bastion_profile" {
  name = "bastion-profile"

  role = aws_iam_role.bastion_role.name
}

resource "aws_security_group_rule" "egress_all" {
  type        = "egress"
  from_port   = 0
  to_port     = 0
  protocol    = "-1"
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id = aws_security_group.bastion_sg.id
}

resource "aws_security_group_rule" "ssh_inbound" {
  type        = "ingress"
  from_port   = 22
  to_port     = 22
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]
  security_group_id = aws_security_group.bastion_sg.id
}
