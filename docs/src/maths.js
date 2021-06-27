class vec3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  minus(other) {
    return new vec3(this.x - other.x, this.y - other.y, this.z - other.z)
  }

  plus(other) {
    return new vec3(this.x + other.x, this.y + other.y, this.z + other.z)
  }

  dot(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z
  }

  cross(other) {
    //return this.x * other.y - this.y * other.z - this.z * other.x
    return this.x * other.y - this.y * other.x
  }
}

export default vec3
